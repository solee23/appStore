const User = require('../models/user.model')
const asyncHandler = require('express-async-handler')
const { createToken, createRefreshToken } = require('../middlewares/jsonwebtoken')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendMail = require('../utils/sendEmail')
const makeToken = require('uniqid')



// const register = asyncHandler(async (req, res) => {
//     const { firstName, lastName, email, password, avt } = req.body;
//     if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({
//             success: false,
//             mes: 'Vui lòng nhập đầy đủ thông tin...'
//         })
//     }
//     const user = await User.findOne({ email })
//     if(!user){
//         const newUser = await User.create(req.body);
//         return res.status(200).json({
//             success: newUser ? true : false,
//             mes: newUser ? 'Đăng ký thành công. Vui lòng đăng nhập.' : 'Đăng ký thất bại.'
//         })

//     }else{
//         return res.status(401).json({
//             success: false,
//             message: 'Tài khoản email đã tồn tại.'
//         })
//     }
// });

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            mes: 'Vui lòng nhập đầy đủ thông tin...'
        })
    }
    const user = await User.findOne({ email })
    if (!user) {
        const token = makeToken()
        res.cookie('dataRegister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 })
        const html = `Xác nhận email của bạn. <a href=${process.env.URL_SERVER}/api/v1/user/final-register/${token}>Nhấn vào đây.</a>`;
        const data = {
            email,
            subject: 'Xác nhận tài khoản',
            html
        }
        await sendMail(data)
        res.status(200).json({
            success: true,
            message: 'Thư đã gửi.'
        })
    } else {
        return res.status(401).json({
            success: false,
            message: 'Tài khoản email đã tồn tại.'
        })
    }


})

const finalRegister = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    const { token } = req.params
    if (!cookie || cookie?.dataRegister?.token !== token){
        res.clearCookie('dataRegister')
        return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`)
    }
    const newUser = await User.create({
        firstName: cookie?.dataRegister?.firstName,
        lastName: cookie?.dataRegister?.lastName,
        email: cookie?.dataRegister?.email,
        password: cookie?.dataRegister?.password,
    });
    res.clearCookie('dataRegister')
    if(newUser) return res.redirect(`${process.env.CLIENT_URL}/final-register/success`)
    else return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`)
    // return res.status(200).json({
    //     success: newUser ? true : false,
    //     mes: newUser ? 'Đăng ký thành công. Vui lòng đăng nhập.' : 'Đăng ký thất bại.'
    // })
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập đầy đủ thông tin...'
        })
    }
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
        const { password, role, ...resData } = user.toObject();
        const token = createToken(user._id, role);
        const refresh = createRefreshToken(user._id);
        await User.findByIdAndUpdate(user._id, { refreshToken: refresh });
        res.cookie('refreshToken', refresh, { httpOnly: true, age: 1 * 60 * 60 })
        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công...',
            resData,
            token
        });
    } else {
        return res.status(404).json({
            message: 'Sai tài khoản hoặc mật khẩu...',
        });
    };
});

const getOne = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password -role');
    if (user) {
        res.status(200).json({
            message: 'Thông tin của người dùng...',
            data: user
        });
    }
});

const refreshAccesstoken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshAccesstoken) throw Error('Không có refeshtoken');
    const rs = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken });
    return res.status(200).json({
        sucess: response ? true : false,
        newAccesstoken: response ? createToken(response._id, response.role) : 'Không tìm thấy refresh token...'
    })

});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshAccesstoken) throw Error('Không có refeshtoken');
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });
    return res.status(200).json({
        sucess: true,
        message: 'Đăng xuất thành công...'
    })
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) return res.status(200).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ.'
    })
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({
        success: false,
        message: 'Không tìm thấy người dùng.'
    })
    const resetToken = user.createPasswordChange();
    await user.save();

    const html = `<a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Link sẽ hết hạn trong 15p đó nhé....</a>`;

    const data = {
        email,
        subject: 'Lấy lại mật khẩu',
        html
    };
    await sendMail(data);
    return res.status(200).json({
        success: true,
        message: 'Thư đã gửi. Vui lòng kiểm tra hòm thư Email của bạn.'
    })

})

const resetPassWord = asyncHandler(async (req,res) => {
    const {password, token} = req.body
    if (!password || !token) return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ.'
    })
    const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({passwordResetToken,passwordResetExpires: {$gt: Date.now()}})
    if (!user) return res.status(400).json({
        success: false,
        message: 'Thời gian xác nhận đã hết hạn.'
    })
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Cập nhật mật khẩu thành công.' : 'Thời gian xác nhận đã hết hạn.'
    })
})

const updateAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy'
    })
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        message: response ? response : 'Cập nhật không thành công'
    })
})

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, quatity, color } = req.body
    if (!pid || !quatity || !color) return res.status(404).json({
        success: false,
        message: 'Nhập đầy đủ thông tin'
    })
    const user = await User.findById(_id)
    const product = user?.cart?.find(el => el.product.toString() === pid)
    if (product) {
        if (product.color === color) {
            const response = await User.updateOne({ cart: { $elemMatch: product } }, { $set: { "cart.$.quatity": quatity } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                message: response ? response : 'Cập nhật không thành công'
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quatity, color } } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                message: response ? response : 'Cập nhật không thành công'
            })
        }
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quatity, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? response : 'Cập nhật không thành công'
        })
    }

})


module.exports = {
    register,
    login,
    getOne,
    refreshAccesstoken,
    logout,
    forgotPassword,
    updateAddress,
    updateCart,
    finalRegister,
    resetPassWord
}
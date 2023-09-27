const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const { createToken, createRefreshToken } = require('../middlewares/jsonwebtoken');


const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, avt } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    }
    const user = await User.findOne({ email })
    if (user) throw new Error('User has existed');
    const newUser = await User.create(req.body);
    return res.status(200).json({
        sucess: newUser ? true : false,
        mes: newUser ? 'Register is successfully. Please go login~' : 'Something went wrong'
    })

});

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    }
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
        const { password, role, ...resData } = user.toObject();
        const token = createToken(user._id, role);
        const refresh = createRefreshToken(user._id);
        await User.findByIdAndUpdate(user._id,  {refreshToken :refresh} );
        res.cookie('refreshToken', refresh, { httpOnly: true, age: 1 * 60 * 60 })
        res.status(200).json({
            message: 'Đăng nhập thành công...',
            resData,
            token
        });
    }else {
        throw new Error('Invalid credentials!')
    };
});

const getOne = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id);
    if (user) {
        res.status(200).json({
            message: 'Danh sách tất cả người dùng...',
            data: user
        });
    }
});

module.exports = {
    register,
    login,
    getOne
}
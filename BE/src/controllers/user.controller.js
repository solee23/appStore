const User = require('../models/user.model');
const catchAsynError = require('../middlewares/catchAsynError');
const ErrorHandle = require('../utils/errorHandle');

const register = catchAsynError(async(req,res,next) => {
    const { firstName, lastName, email, password, avt } = req.body;
    if(!firstName || !lastName || !email || !password){
         return next(new ErrorHandle('Vui lòng nhập đầy đủ hông tin...', 400));
    }
    const user = await User.findOne({email})
    if(user){
        return next(new ErrorHandle('Email đã tồn tại...', 404));
    }
    const newUser = await User.create(req.body);
    res.status(200).json({
        message: 'Tạo thành công... Bạn có muỗn đăng nhập ?',
        data: newUser
    });

});

const login = catchAsynError(async(req,res,next) => {
    const { email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandle('Vui lòng nhập đầy đủ hông tin...', 400));
    }
    const user = await User.findOne({email});
    if(user && await user.comparePassword(password)){
        const { password, role, ...resData} = user.toObject();
        res.status(200).json({
            message: 'Đăng nhập thành công...',
            resData
        })
    }
    return next(new ErrorHandle('Sai tài khoản hoặc mật khẩu...', 404));
});

const getAll = catchAsynError(async(req,res) => {
    const users = await User.find();
    if (users) {
        res.status(200).json({
            message: 'Danh sách tất cả người dùng...',
            data: users
        });
    }
    return next(new ErrorHandle('Không tìm thấy danh sách...', 404));
});

module.exports = {
    register,
    login,
    getAll
}
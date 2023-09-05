const User = require('../models/user.model');
const catchAsynError = require('../middlewares/catchAsynError');
const ErrorHandle = require('../utils/errorHandle');

const createUser = catchAsynError(async(req,res,next) => {
    const { firstName, lastName, email, password, avt } = req.body;
    if(!firstName || !lastName || !email || !password){
         return next(new ErrorHandle('Vui lòng nhập đầy đủ hông tin...', 400));
    }
    const user = await User.create(req.body);
    res.status(200).json({
        message: 'Tạo thành công...',
        data: user
    });
});

const getAll = catchAsynError(async(req,res) => {
    const users = await User.find();
    if (!users) {
        return next(new ErrorHandle('Không tìm thấy danh sách...', 404));
    }
    res.status(200).json({
        message: 'Danh sách tất cả người dùng...',
        data: users
    });
});

module.exports = {
    createUser,
    getAll
}
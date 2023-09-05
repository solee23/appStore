const ErrorHandle = require('../utils/errorHandle')
const error = (err, req, res, next) => {
    err.message = err.message || 'Lỗi máy chủ !!!';
    err.statusCode = err.statusCode || 500;
    if (err.code === 11000) {
        const message = `Bạn đang nhập trùng dữ liệu đã tạo...`;
        err = new ErrorHandle(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
module.exports = error;
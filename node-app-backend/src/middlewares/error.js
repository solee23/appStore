
const error = (err, req, res, next) => {
    err.message = err.message || 'Lỗi máy chủ !!!';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
module.exports = error;
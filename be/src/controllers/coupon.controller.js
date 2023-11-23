const Coupon = require('../models/coupon.model');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry} = req.body
    if (!name || !discount || !expiry) return res.status(404).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin.'
    })
    const response = await Coupon.create({...req.body, expiry: Date.now() + +expiry * 24 *60 *60 *1000});
    return res.status(200).json({
        sucess: response ? true : false,
        data: response ? response : 'Không thể tạo.'
    })

});

const getCoupon = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createAt -updateAt');
    return res.status(200).json({
        success: response ? true : false,
        data: response 
    })
});

const updateCoupon = asyncHandler(async (req, res) => {
    const {cid} = req.params
    const response = await Coupon.findById(cid);
    if(!response) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy.'
    })
    if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 *60 *60 *1000
    const update = await Coupon.findByIdAndUpdate(cid, req.body, { new: true })
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Cập nhật không thành công.'
    })
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const {cid} = req.params;
    const response = await Coupon.findById(cid);
    if(!response) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy.'
    })
    const deleted = await Coupon.findByIdAndDelete(cid)
    return res.status(200).json({
        sucess: true,
        data: deleted ? 'Xóa không thành công.' : 'Lỗi.'
    })
});

module.exports = {
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}
const Brand = require('../models/brand.model');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.create(req.body);
    return res.status(200).json({
        sucess: brand ? true : false,
        data: brand ? brand : 'Không thể tạo.'
    })

});

const getBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.find().select('_id title');
    return res.status(200).json({
        success: brand ? true : false,
        data: brand 
    })
});

const updateBrand = asyncHandler(async (req, res) => {
    const {brid} = req.params
    const brand = await Brand.findById(brid);
    if(!brand) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy nhãn hiệu.'
    })
    const  title  = req.body;
    const update = await Brand.findByIdAndUpdate(brid, title, { new: true })
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Cập nhật không thành công.'
    })
});

const deleteBrand = asyncHandler(async (req, res) => {
    const {brid} = req.params;
    const brand = await Brand.findById(brid);
    if(!brand) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm.'
    })
    const deleted = await Brand.findByIdAndDelete(brid)
    return res.status(200).json({
        sucess: true,
        data: deleted ? 'Xóa không thành công.' : 'Lỗi.'
    })
});

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}
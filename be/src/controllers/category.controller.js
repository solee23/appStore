const Category = require('../models/category.model');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);
    return res.status(200).json({
        sucess: category ? true : false,
        data: category ? category : 'Không thể tạo.'
    })

});

const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.find().select('_id title');
    return res.status(200).json({
        success: category ? true : false,
        data: category 
    })
});

const updateCategory = asyncHandler(async (req, res) => {
    const {cid} = req.params
    const category = await Category.findById(cid);
    if(!category) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm.'
    })
    const  title  = req.body;
    const update = await Category.findByIdAndUpdate(cid, title, { new: true })
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Cập nhật không thành công.'
    })
});

const deleteCategory = asyncHandler(async (req, res) => {
    const {cid} = req.params;
    const category = await Category.findById(cid);
    if(!category) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm.'
    })
    const { title } = req.body
    const update = await Category.findByIdAndDelete(cid)
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Xoas không thành công.'
    })
});

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}
const BlogCategory = require('../models/blogCategory.model');
const asyncHandler = require('express-async-handler');

const createBlogCategory = asyncHandler(async (req, res) => {
    const category = await BlogCategory.create(req.body);
    return res.status(200).json({
        sucess: category ? true : false,
        data: category ? category : 'Không thể tạo.'
    })

});

const getBlogCategory = asyncHandler(async (req, res) => {
    const category = await BlogCategory.find().select('_id title');
    return res.status(200).json({
        success: category ? true : false,
        data: category 
    })
});

const updateBlogCategory = asyncHandler(async (req, res) => {
    const {bcid} = req.params
    const category = await BlogCategory.findById(bcid);
    if(!category) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm.'
    })
    const  title  = req.body;
    const update = await BlogCategory.findByIdAndUpdate(bcid, title, { new: true })
    console.log(update);
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Cập nhật không thành công.'
    })
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const {bcid} = req.params;
    const category = await BlogCategory.findById(bcid);
    if(!category) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm.'
    })
    const { title } = req.body
    const update = await BlogCategory.findByIdAndDelete(bcid)
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Xoas không thành công.'
    })
});

module.exports = {
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
}
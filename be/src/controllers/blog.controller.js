const Blog = require('../models/blog.model');
const asyncHandler = require('express-async-handler');

const createBlog = asyncHandler(async (req, res) => {
    const { title, desc, category} = req.body
    if(!title || !desc || !category) return res.status(404).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin.'
    })
    const response = await Blog.create(req.body)
    res.json({
        success: true ? true : false,
        data: response ? response : 'Không thể tạo Blog'
    })
});

const getAllBlog = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    res.json({
        success: true ? true : false,
        data: response ? response : 'Không có bài Blog nào.'
    })
});

const updateBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    const blog = await Blog.findById(bid)
    if(!blog) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
    })
    const { title, desc, category} = req.body
    const update = await Blog.findByIdAndUpdate(bid, req.body, {new: true})
    res.json({
        success: true ? true : false,
        data: update ? update : 'Cập nhật thành công.'
    })
});

const likeBlog = asyncHandler( async(req,res) => {
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) return res.status(404).json({
        message: 'Quên id của blog'
    })
    const blog = await Blog.findById(bid)
    const disLiked = blog?.disLike?.find(el => el.toString() === _id)
    if(disLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {disLike: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const liked = blog?.like?.find(el => el.toString() === _id)
    if(liked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {like: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {like: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

const dislikeBlog = asyncHandler( async(req,res) => {
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) return res.status(404).json({
        message: 'Quên id của blog'
    })
    const blog = await Blog.findById(bid)
    const liked = blog?.like?.find(el => el.toString() === _id)
    if(liked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {like: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const disLiked = blog?.disLike?.find(el => el.toString() === _id)
    if(disLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {disLike: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {disLike: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})


module.exports = {
    createBlog,
    updateBlog,
    getAllBlog,
    likeBlog,
    dislikeBlog
}
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


const getBlog = asyncHandler(async (req, res) => {

    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc: { numberViews: 1}}, {new: true}).populate('like', 'firstName lastName').populate('disLike',  'firstName lastName')
    res.json({
        success: blog ? true : false,
        data: blog
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

const deleteBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    if(!blog) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
    })
    res.json({
        success: true ? true : false,
        message: blog ? 'Xóa thành công.' : 'Lỗi.'
    })
});

const likeBlog = asyncHandler( async(req,res) => {
    const {_id} = req.user
    const {bid} = req.params
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
    const {bid} = req.params
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

const uploadImage = asyncHandler(async(req,res) => {
    const {bid} = req.params
    if(!req.file) return res.status(404).json({
        message:'Vui lòng nhập đầy đủ.'
    })
    const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path}, {new: true})
    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Không thể upload ảnh.'
    })
})


module.exports = {
    createBlog,
    updateBlog,
    getAllBlog,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImage
}
const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');
require('dotenv').config()
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const product = await Product.create(req.body);
    return res.status(200).json({
        sucess: product ? true : false,
        data: product
    })

})

const get = asyncHandler(async(req, res) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let result = JSON.parse(queryStr);

    let queryCommand = Product.find(result)

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LITMIT_PRODUCTS;
    const skip = (page - 1) * limit;

    queryCommand.skip(skip).limit(limit);


    const allProduct = await Product.find(queryCommand);
    if (allProduct.length === 0) return res.status(400).json({
        success: false,
        message: 'Không có sản phẩm nào'
    })
    return res.status(200).json({
        success: true,
        data: allProduct
    })
})

const getById = asyncHandler(async(req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) return res.status(400).json({
        sucess: false,
        message: 'Không tìm thấy sản phẩm'
    })
    return res.status(200).json({
        sucess: true,
        data: product
    })

})
const updateById = asyncHandler(async(req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({
        sucess: false,
        message: 'Không tìm thấy sản phẩm.'
    })
    const update = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Cập nhật không thành công.'
    })

})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findByIdAndDelete(pid);
    if (!product) return res.status(400).json({
        sucess: false,
        message: 'Không tìm thấy sản phẩm'
    })
    return res.status(200).json({
        sucess: true,
        message: 'Xóa sản phẩm thành công'
    })
})

const uploadImage = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if(!req.files) return res.status(404).json({
        message:'Vui lòng nhập đầy đủ.'
    })
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(el => el.path)}}}, {new: true})
    return res.status(200).json({
        status: response ? true : false,
        data: response ? response : 'Không thể upload ảnh.'
    })

})

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) throw new Error('Vui lòng nhập đầy đủ thông tin');
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.some(el => el.postedBy.toString() === _id);
    if (alreadyRating) {
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating}
        },{
            $set: {"ratings.$.star": star, "ratings.$.comment": comment}
        }, { new: true })
    }else{
        const respone = await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id } }
        }, { new: true })
    }

    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + el.star,0);
    updatedProduct.totalRatings = Math.round(sumRatings * 10 /ratingCount) / 10;
    await updatedProduct.save();

    return res.status(200).json({
        sucess: true,
        updatedProduct

    })


})


module.exports = {
    createProduct,
    get,
    getById,
    updateById,
    deleteProduct,
    ratings,
    uploadImage
}
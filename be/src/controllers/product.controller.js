const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler')
// const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    // if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin')
    // if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const product = await Product.create(req.body);
    return res.status(200).json({
        sucess: product ? true : false,
        data: product
    })

})

const get = async (req, res) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // if (req.query.sort) {
    //     // if there is multiple sort option, replace (,)comma with space
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     this.query = this.query.sort(sortBy);
    //   } else {
    //     this.query = this.query.sort('-createdAt');
    //   }
    //   if (req.query.sort) {
    //     const fields = req.query.sort.fields.split(',').join(' ');
    //     this.query = this.query.select(fields);
    //   } else {
    //     //remove default __v fields from result
    //     this.query = this.query.select('-__v');
    //   }

    const allProduct = await Product.find(JSON.parse(queryStr));
    if (allProduct.length === 0) return res.status(400).json({
        sucess: false,
        message: 'Không có sản phẩm nào'
    })
    return res.status(200).json({
        sucess: true,
        data: allProduct
    })
}

const getById = async (req, res) => {
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

}
const updateById = async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) return res.status(400).json({
        sucess: false,
        message: 'Không tìm thấy sản phẩm'
    })
    const update = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        sucess: true,
        data: update ? update : 'Cập nhật không thành công'
    })

}

const deleteProduct = async (req, res) => {
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
}

// const getUserProduct = async(req,res) => {
//     const data = await Product.aggregate([
//         {
//             $lookup: {
//                 from: "users",
//                 localField: "user",
//                 foreignField: "_id",
//                 as: "user"
//             }
//         },
//         {
//             $project: {
//                 name: 1,
//                 avt: 1,
//                 user: {
//                     lastName: 1,
//                     email: 1
//                 }
//             }
//         }
//     ])
//     res.status(200).json({
//         message: "Detail Product of User",
//         data: data,
//     })
// }

module.exports = {
    createProduct,
    get,
    getById,
    updateById,
    deleteProduct
    // getUserProduct
}
const Product = require('../models/product.model');

const createProduct = async(req,res) => {
 console.log('hello ')
}

const get = async(req,res) => {
    const productDetail = await Product.aggregate([
        {
            $project: {
                name: 1,
                rating: 1,
                review: 1,
                avt: 1
            } 
        },
        {
            $group: {
                _id: "$avt",
                count: { $sum: 1}
            }
        }
    ])
    res.status(200).json({
        message: "Detail of Product",
        data: productDetail,
    })
}

const getUserProduct = async(req,res) => {
    const data = await Product.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
                name: 1,
                avt: 1,
                user: {
                    lastName: 1,
                    email: 1
                }
            }
        }
    ])
    res.status(200).json({
        message: "Detail Product of User",
        data: data,
    })
}

module.exports = {
    createProduct,
    get,
    getUserProduct
}
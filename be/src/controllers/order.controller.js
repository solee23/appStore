const User = require('../models/user.model');
const Order = require('../models/order.model');
const Coupon = require('../models/coupon.model');
const asyncHandler = require('express-async-handler');


const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const product = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quatity,
        color: el.color
    }))
    const total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quatity + sum  ,0)
    const createData = {product, total, orderby: _id}
    if(coupon){
        const select = await Coupon.findById(coupon)
        total = Math.round(total - (1 * +select?.discount / 100) / 1000) *1000 || total 
        createData.total = total
        createData.coupon = coupon

    }
    const response = await Order.create(createData)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Không tìm thấy'
    })
})

const updateStatus = asyncHandler(async (req, res) => {
    const {oid} = req.params
    const {status} = req.body
    if (!status) {
        return res.status(400).json({
            sucess: false,
            mes: 'Vui lòng nhập đầy đủ thông tin...'
        })
    }
    const response = await Order.findByIdAndUpdate(oid, {status}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Không tìm thấy'
    })
})


const getUserStatus = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const response = await Order.find({orderby: _id})
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Không tìm thấy'
    })
})

const getAllStatus = asyncHandler(async (req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Không tìm thấy'
    })
})

module.exports = {
    createOrder,
    updateStatus,
    getUserStatus,
    getAllStatus
}
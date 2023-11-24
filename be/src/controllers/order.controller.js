const User = require('../models/user.model')
const Order = require('../models/order.model');
const asyncHandler = require('express-async-handler');


const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const userCart = await User.findById(_id).select('cart')
    return res.status(200).json({
        success: userCart ? true : false,
        data: userCart ? userCart : 'Không tìm thấy'
    })
    

})
module.exports = {
    createOrder
}
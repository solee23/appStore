const mongooes = require('mongoose');

const orderSchema = new mongooes.Schema({
    product:[
        {
            product: { type: mongooes.Types.ObjectId, ref: 'Product'},
            count: Number,
            color: String,
        }
    ],
    status: {
        type: String,
        default: 'Đang xử lý',
        enum: ['Đang xử lý', 'Hủy', 'Thành công'] 
    },
    total: {
        type: Number
    },
    coupon:{
        type: mongooes.Types.ObjectId,
        ref: 'Coupon'
    },
    orderby: {
        type: mongooes.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    })

module.exports = mongooes.model("Order", orderSchema)
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
    paymentIntent: {
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
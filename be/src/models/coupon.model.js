const mongooes = require('mongoose');

const couponSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    discount: {
        type: Number,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true
    })

module.exports = mongooes.model("Coupon", couponSchema)
const mongooes = require('mongoose');

const productSchema = new mongooes.Schema({
    name: {
        type        : String,
        required    : true
    },
    price: {
        type        : String,
        required    : true 
    },
    decription: {
        type        : String,
        required    : true
    },
    rating: {
        type        : String,
        required    : true,
    },
    avt: {
        type        : String,
        required    : true,
    },
    category: {
        type        : String,
        required    : true,
    },
    review: {
        type        : String,
        required    : true,
    },
    user: {
        type        : mongooes.Schema.ObjectId,
        ref         : "User",
        required    : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongooes.model("Product", productSchema)
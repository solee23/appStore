const mongooes = require('mongoose');

const productSchema = new mongooes.Schema({
    title: {
        type: String,
        required: true,
        // trim: true
    },
    slug: {
        type: String,
        required: true,
        // unique: true,
        // lowercase: true
    },
    desc: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongooes.Schema.ObjectId,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        enum: ['Black', 'Grown', 'Red']
    },
    sold: {
        type: Number,
        required: true,
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongooes.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
    thumb: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    })

module.exports = mongooes.model("Product", productSchema)
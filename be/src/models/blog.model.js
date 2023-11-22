const mongooes = require('mongoose');

const blogSchema = new mongooes.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numberViews: {
        type: Number,
        default: 0,
    },
    like: [{
        type: mongooes.Types.ObjectId,
        ref: 'User'
    }],
    disLike: [{
        type: mongooes.Types.ObjectId,
        ref: 'User'
    }],
    image: {
        type: String,
        default: 'https://lambienquangcao.org/wp-content/uploads/2019/11/blog-795x385.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    }
},
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

module.exports = mongooes.model("Blog", blogSchema)
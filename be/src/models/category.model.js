const mongooes = require('mongoose');

const categorySchema = new mongooes.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    brand: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    })

module.exports = mongooes.model("Category", categorySchema)
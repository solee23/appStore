const mongooes = require('mongoose');

const brandSchema = new mongooes.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
},
    {
        timestamps: true
    })

module.exports = mongooes.model("Brand", brandSchema)
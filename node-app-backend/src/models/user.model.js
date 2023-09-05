const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    firstName: {
        type        : String,
        required    : true
    },
    lastName: {
        type        : String,
        required    : true 
    },
    email: {
        type        : String,
        required    : true
    },
    password: {
        type        : String,
        required    : true,
    },
    avt: {
        type        : String,
    },
    createAt: {
        type        : Date,
        default     : Date.now()
    }
})

module.exports = mongooes.model("User", userSchema)
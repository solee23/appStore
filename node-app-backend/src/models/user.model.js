const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    firstName: {
        type        : String,
        required    : true,
    },
    lastName: {
        type        : String,
        required    : true,
    },
    email: {
        type        : String,
        required    : true,
        unique      : true
    },
    password: {
        type        : String,
        required    : true,
    },
    mobile: {
        type        : String,
        unique      : true
    },
    avt: {
        type        : String,
    },
    role: {
        type        : String,
        default     : 'user'
    },
    cart: {
        type        : Array,
        default     : []
    },
    address: [
        {
            type    : mongooes.Types.ObjectId,
            ref     : 'Address'
        }
    ],
    wishlist: [
        {
            type    : mongooes.Types.ObjectId,
            ref     : 'Product'
        }
    ],
    isBlocked: {
        type        : Boolean,
        default     : false
    },
    refreshToken: {
        type        : String,
    },
    passwordChangedAt: {
        type        : String
    },
    passwordResetToken: {
        type        : String
    },
    passwordResetExpires: {
        type        : String
    },
    createAt: {
        type        : Date,
        default     : Date.now()
    }, 
},{
    timestamps      : true
})

module.exports = mongooes.model("User", userSchema)
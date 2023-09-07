const mongooes = require('mongoose');
const bcrypt = require('bcrypt');

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
},{
    timestamps      : true
})

userSchema.pre('save', async function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports = mongooes.model("User", userSchema)
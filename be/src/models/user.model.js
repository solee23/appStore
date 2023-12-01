const mongooes = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    avt: {
        type        : String,
    },
    role: {
        type        : String,
        default     : 'user'
    },
    cart: [{
        product: {
            type: mongooes.Types.ObjectId,
            ref: 'Product'
        },
        quatity: Number,
        color: String,
        
    }],
    address: {
        type: Array,
        default: []
    },
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
    registerToken: {
        type        : String
    },
},{
    timestamps      : true
})

userSchema.pre('save', async function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods = {
    comparePassword: async function(password) {
        return await bcrypt.compare(password,this.password);
    },
    createPasswordChange: function(){
        const resetToken = crypto.randomBytes(20).toString("hex");
        this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        this.passwordResetExpires = Date.now() + 15 *60 *1000;
        return resetToken;
    }
}

module.exports = mongooes.model("User", userSchema)
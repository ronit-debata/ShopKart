const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');
const Order = require('./order');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    role: {
        type: String,
        required: true
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    //for password resetting
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
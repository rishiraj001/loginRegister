const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    avatar:{
        data: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
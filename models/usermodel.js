const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    function: {
        required: true,
        type: String,
    },
    organization: {
        required: true,
        type: String,
    },
    department: {
        required: true,
        type: String,
    },
    specialization: {
        type: String,
    },
    city: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    passwordResetCode: {
        type: String,
    },
    password: { type: String, required: true },
    role: {
        required: true,
        type: String,
    },
},
{timestamps: true},
)

module.exports = mongoose.model('User', userSchema)
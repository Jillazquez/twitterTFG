const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
    ],
    following: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
    ],
    profilePicture: { 
        type: String, default: '' 
    },
    description:{
        type: String, default:''
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

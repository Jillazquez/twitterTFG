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
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Usuarios que siguen a este usuario
    ],
    following: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Usuarios que este usuario sigue
    ],
    profilePicture: { 
        type: String, default: '' 
    },
    description:{
        type: String, default:''
    }
});

// Middleware para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    const user = this;

    // Solo hashear si la contraseña ha sido modificada o es nueva
    if (!user.isModified('password')) return next();

    try {
        // Generar el salt
        const salt = await bcrypt.genSalt(10);

        // Hashear la contraseña
        user.password = await bcrypt.hash(user.password, salt);

        next();
    } catch (error) {
        return next(error);
    }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

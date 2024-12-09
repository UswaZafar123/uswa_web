const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true,
    },
    address: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'carowner'],
        required: true,
        default: 'customer',
    },
}, {
    timestamps: true,
});

// Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

// Method to compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log("1: " , this.password);
    console.log("2: " , enteredPassword);
    const a = bcrypt.compare(enteredPassword, this.password);
    console.log("3: " , a); 
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
module.exports = mongoose.model('User', userSchema);

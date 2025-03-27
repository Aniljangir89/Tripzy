const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {  
            type: String,
            required: true,
            minLength: [3, 'First name should be at least 3 characters long'],
        },
        lastname: {
            type: String,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false // ✅ Ensures password is explicitly selected when needed
    },
    socketId: {
        type: String
    }
});

// ✅ Generate Auth Token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// ✅ Compare Password Correctly
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // No need for DB query
};

// ✅ Move `hashPassword` to `statics` so it can be called on the model
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

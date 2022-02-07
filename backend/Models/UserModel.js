const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    pic: {
        type: String, required: true,
        default: 'https://www.shutterstock.com/image-vector/default-avatar-profile-trendy-style-social-1759726295'
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;

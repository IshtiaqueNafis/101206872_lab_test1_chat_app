const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pic: {
        type: String, required: true,
        default: 'https://www.shutterstock.com/image-vector/default-avatar-profile-trendy-style-social-1759726295'
    }
}, {timestamps: true});


userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);// password is being compared here.
}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);
module.exports = User;

const asyncHandler = require('express-async-handler')
const User = require('../Models/UserModel')
const {use} = require("express/lib/router");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, pic} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('please enter all the fields')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')

    }

    const user = await User.create({
        name,
        email, password, pic
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        })

    } else {
        res.status(400);
        throw new Error('could not create new user');
    }
})

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        })
    } else {
        res.status(401);
        throw new Error('invalid credentials');
    }
})

module.exports = {registerUser, authUser}
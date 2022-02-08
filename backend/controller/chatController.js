const asyncHandler = require('express-async-handler')
const Chat = require('../Models/ChatModel')
const User = require('../Models/UserModel');
const accessChat = asyncHandler(async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.status(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$eleMatch: {$eq: req.user._id}}},
            {users: {$eleMatch: {$eq: userId}}}

        ]
    }).populate('users', "-password").populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email"

    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId] // current user id
        }
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate('users', "-password")
            res.status(200).send(FullChat);


        } catch (e) {
            res.status(400)
            throw new Error(error.message);
        }

    }
})
const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}}).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({updatedAt: -1}).then(async (results) => {
            results = await User.populate(results, {
                path: 'latestMessage.sender',
                select: "name email"
            });
            res.status(200).send(results);
        })
    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({
            message: "please fill in all the fields."
        })
    }
    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("more than 2 users are required on group chat");
    }

    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({_id: groupChat._id}).populate("users", "-password").populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);

    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }

})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});


const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});


const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});


module.exports = {accessChat, fetchChats, createGroupChat,renameGroup,addToGroup,renameGroup}
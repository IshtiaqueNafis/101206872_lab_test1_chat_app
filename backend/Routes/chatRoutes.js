const express = require('express');
const {protect} = require("../middlewares/authMiddleWare");
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup} = require("../controller/chatController");

const router = express.Router();
router.route('/').post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route('/groupremove').put(protect,)
router.route("/groupAdd").put(protect, addToGroup, renameGroup);

module.exports = router;
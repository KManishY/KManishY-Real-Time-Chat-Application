const express = require('express');
const { createChat, getChats, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createChat)
    .get(protect, getChats);

router.route('/message')
    .post(protect, sendMessage);

module.exports = router;

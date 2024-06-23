const Chat = require('../models/Chat');
const Message = require('../models/Message');

const createChat = async (req, res) => {
    const { userIds } = req.body;
    const chat = await Chat.create({ users: userIds });

    if (chat) {
        res.status(201).json(chat);
    } else {
        res.status(400);
        throw new Error('Invalid chat data');
    }
};

const getChats = async (req, res) => {
    const chats = await Chat.find({ users: req.user._id });
    res.json(chats);
};

const sendMessage = async (req, res) => {
    const { chatId, content } = req.body;
    const message = await Message.create({
        sender: req.user._id,
        content,
        chat: chatId,
    });

    if (message) {
        res.status(201).json(message);
    } else {
        res.status(400);
        throw new Error('Invalid message data');
    }
};

module.exports = { createChat, getChats, sendMessage };

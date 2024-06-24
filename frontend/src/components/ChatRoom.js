import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';
import ChatMessage from './ChatMessage';

const socket = io('http://localhost:8000');

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            const response = await api.get('/chat');
            if (response.data.length > 0) {
                setChatId(response.data[0]._id);
                socket.emit('joinChat', response.data[0]._id);
            }
        };
        fetchChats();
    }, []);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const response = await api.post('/chat/message', { chatId, content: newMessage });
        socket.emit('sendMessage', response.data);
        setNewMessage('');
    };

    return (
        <div className="chat-room">
            <div className="messages">
                {messages.map((msg) => (
                    <ChatMessage key={msg._id} message={msg} />
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;

import React from 'react';

const ChatMessage = ({ message }) => {
    return (
        <div className="chat-message">
            <strong>{message.sender.username}: </strong>
            <span>{message.content}</span>
        </div>
    );
};

export default ChatMessage;

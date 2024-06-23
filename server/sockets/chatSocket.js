const chatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`Client joined chat: ${chatId}`);
        });

        socket.on('sendMessage', (message) => {
            io.to(message.chat).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = chatSocket;

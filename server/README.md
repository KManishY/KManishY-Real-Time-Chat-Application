# Real-Time Chat Application

## Description

A real-time chat application built using the MERN stack with WebSocket for real-time communication.

## Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/chatapp-server.git
   cd chatapp-server
   ```
2. Install NPM packages
   ```sh
   npm install
    Start the server
   ```
3. Create a .env file in the root directory and add the following

MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key
PORT=5000

4. Start the server
    ```
    npm run dev
    ```

## API Endpoints
```
- Auth Routes
POST /api/auth/register: Register a new user
POST /api/auth/login: Login a user
- User Routes
GET /api/users/profile: Get user profile (Protected)
- Chat Routes
POST /api/chat: Create a new chat (Protected)
GET /api/chat: Get all chats for the logged-in user (Protected)
POST /api/chat/message: Send a message to a chat (Protected)
```
WebSocket Events
Client Events
joinChat: Join a chat room
sendMessage: Send a message to the chat room
Server Events
newMessage: Broadcast a new message to the chat room
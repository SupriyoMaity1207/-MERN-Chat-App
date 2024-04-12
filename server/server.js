const express = require('express');
const cors = require('cors');
const http = require('http'); // Change require('http') to require('http') for consistency
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server using http module
const io = new Server(server);
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
});

const users=[]
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("joined",({user})=>{
        users[socket.id]=user
        console.log(`${user} joined the chat! `);
        socket.broadcast.emit('userjoined',{user:'Admin',message:`${users[socket.id]}  has joined the chat`})
    })

    socket.emit("welcome",{user:'Admin',message:'Wlcome to the chat'})
    socket.on('disconnect', () => {
        socket.broadcast.emit('userleft',{user:'Admin', message: `${users[socket.id]} left the chat.` });
        console.log(`user has left`)
    })

    socket.on( 'chatMessage', ({message,id}) =>{
        io.emit('sendMessage',{user:users[id], message,id})
    })

    // Handle socket errors
    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

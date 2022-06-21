const express = require("express")
const mongoose = require("mongoose")
const path = require('path')
const http = require("http")
const { Server } = require("socket.io")
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3215;

// const { connectDB } = require('./connectDB')
// connectDB()
// const userRoute = require('./router/userRout')
// app.use('/', userRoute)

app.use(express.static("client/build"));
app.use(express.json());

const connectedUsers = []

io.on("connection", (socket) => {
    socket.on("user-join", ({ roomNumber, name }) => {
        if (roomNumber) {
            socket.join(roomNumber)
            console.log(`connect ${name} to room ${roomNumber}`)
            const countOfUsers = io.sockets.adapter.rooms.get(roomNumber).size
            console.log(`now in the room ${countOfUsers}`)
            io.to(roomNumber).emit("user-get-in", name)
            io.to(roomNumber).emit("users-amount", countOfUsers)
            connectedUsers.push(name)
            console.log(connectedUsers)
            io.to(roomNumber).emit("user-list", connectedUsers)
        }
    })

    socket.on("chat-user", ({ roomNumber, msg, name }) => {
        console.log(`name:` + name)
        console.log('message: ' + msg);
        io.to(roomNumber).emit('user-message', { msg, name });
    })

    socket.on("user-leave", ({ roomNumber, name }) => {
        if (roomNumber) {
            console.log(`leave ${name} to room ${roomNumber}`)
            connectedUsers.splice(connectedUsers.indexOf(name), 1)
            console.log(connectedUsers)
            io.to(roomNumber).emit("user-list", connectedUsers)
            socket.leave(roomNumber);
        }
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
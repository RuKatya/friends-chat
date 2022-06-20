const express = require("express")
const mongoose = require("mongoose")
const path = require('path')
const http = require("http")
const { Server } = require("socket.io")
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3215;

const { connectDB } = require('./connectDB')
connectDB()

app.use(express.static("client/build"));
app.use(express.json());

const userRoute = require('./router/userRout')
app.use('/', userRoute)

io.on("connection", (socket) => {
    socket.on("user-join", (roomId) => {
        if (roomId) {
            socket.join(roomId)
            console.log(`connecte user to room ${roomId}`)
        }
    })

    socket.on("chat-user", ({ roomNumber, msg }) => {
        console.log('message: ' + msg);
        io.to(roomNumber).emit('user-message', msg);
    })

    socket.on("user-leave", (roomId) => {
        if (roomId) {
            socket.leave(roomId);
            console.log(`leaved user to room ${roomId}`)
        }
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './projects/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
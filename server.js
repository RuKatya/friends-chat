const express = require("express")
const path = require('path')
const http = require("http")
const { Server } = require("socket.io")
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3215;

app.use(express.static("client/build"));
app.use(express.json());

const connectedUsers = []

io.on("connection", (socket) => {
    socket.on("user-join", ({ roomNumber, userName }) => {
        if (roomNumber) {
            socket.join(roomNumber)
            console.log(socket.id)
            // console.log(`connect ${userName} to room ${roomNumber}`)
            const countOfUsers = io.sockets.adapter.rooms.get(roomNumber).size
            console.log(`now in the room ${countOfUsers}`)
            // io.to(roomNumber).emit("user-get-in", userName)
            // io.to(roomNumber).emit("users-amount", countOfUsers)
            // connectedUsers.push(userName)
            // console.log(connectedUsers)
            // io.to(roomNumber).emit("user-list", connectedUsers)
        }
    })

    socket.on("chat-user", ({ roomNumber, textMsg, userName }) => {
        console.log(`userName:` + userName)
        console.log('message: ' + textMsg);
        io.to(roomNumber).emit('user-message', { textMsg, userName });
    })

    socket.on("user-leave", ({ roomNumber, userName }) => {
        if (roomNumber) {
            console.log(`leave ${userName} to room ${roomNumber}`)
            connectedUsers.splice(connectedUsers.indexOf(userName), 1)
            console.log(connectedUsers)
            io.to(roomNumber).emit("user-list", connectedUsers)
            socket.leave(roomNumber);
        }
    });

    socket.on("disconnect", () => {
        // const countOfUsers = io.sockets.adapter.rooms.get(roomNumber).size
        // console.log(`now in the room ${countOfUsers}`)
        // console.log(io)
        console.log(`out `)
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
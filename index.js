const express = require('express');
const app = express();
const port = process.env.port || 3000;
const socketIO = require('socket.io');
const server = express()
  .use(app)
  .listen(port, () => console.log(`Listening Socket on ${ port }`));
const io = socketIO(server);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function (socket) {
    console.log(`${socket.id} is connected`);
    socket.on('user_join', function (data) {
        this.username = data;
        socket.broadcast.emit('user_join', data);

    });

    socket.on('chat_message', function (data) {

        data.username = this.username;
        socket.broadcast.emit('chat_message',data);

    });

    socket.on('disconnected', function (data) {
        socket.broadcast.emit('disconnected',data);
    });
});


// app.listen(port, function () {
//     console.log('app is listening on :' + port);
// });


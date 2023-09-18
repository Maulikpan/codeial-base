
module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) { //receive a connection when fire from frontend
        //socket is object it has many property
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });
        //this send acknowledgement automatically to frontend connectionHandler() and invoke it
        //emmit back

        socket.on('join_room', function (data) {
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        })
        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        })
    });

}
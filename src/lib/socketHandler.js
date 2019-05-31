var io = require('socket.io-client')

export class SocketHandler {

    constructor() {
        var socket = io('http://localhost:3000');

        socket.on('connect', connectEvent(socket));

        socket.on('event', event(data));
    
        socket.on('disconnect', disconnectEvent());
    }

    /* Runs when connection is made */
    connectEvent(socket) {
        
        console.log('Connected');
    }

    /* Runs when event occurs */
    event(data) {
        console.log(data);
    }

    /* Runs when socket disconnects */
    disconnectEvent() {
        console.log('Disconnected');
    }

    /* Emits event where message is sent */
    sendMessage(message, room) {
        socket.emit('message', message);
    }

    updateCode(code, room) {
        socket.emit('newCode', room)
    }

}
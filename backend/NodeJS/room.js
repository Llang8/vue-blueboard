var socket = require('socket.io');

class Room {

    constructor(id, server) {
        this.id = id;
        this.users = [];
        this.io = socket(server);
        // Set up namespace to id
        this.nsp = this.io.of(`/${this.id}`);
        console.log(this.nsp);
        // Add user to users array on connection
        this.nsp.on('connection', (socket) => {
            console.log('Connected');

            // Emit message to room
            socket.on('message',(msg) => {
                this.nsp.emit('message', {
                    'user': msg.user,
                    'msg': msg.msg
                })
            });

            socket.on('editor changed',(value) => {
                this.nsp.emit('editor changed', {editorValue: value.editorValue});
            })
            // TODO: Remove user from server
            socket.on('disconnect', () => {
                console.log('DISCONNECT');
            })

            // Emit join message
            this.nsp.emit('message', 
                { 'user': 'Server', 'msg':`User has joined!`}
            );
        });
    }

    /* Returns the room's id */
    getId() {
        return this.id;
    }

    /* Returns list of users */
    getUsers() {
        return this.users;
    }
}

module.exports = Room; 
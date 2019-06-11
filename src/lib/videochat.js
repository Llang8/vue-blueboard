/*  File is for managing videochat instances
*   in rooms. Code is a WIP!!! 
*/

var getUserMedia = require('getusermedia')
var Peer = require('simple-peer');

export class Videochat {

    constructor(initiator,socket,data=null) {
        
        this.stream = null;
        this.initiator = initiator;
        this.userId = null;
        this.partnerId = null;
        this.peer = null;
        this.socket = socket;
        var ctx = this;
        // Request access to user's webcam and mic
        getUserMedia({
            video: true,
            audio: true
        }, (err, stream) => {
            // Log errors
            if (err) return console.error(err);
            
            // Save stream object
            ctx.stream = stream;

            ctx.initiator = initiator;

            ctx.peer = new Peer({
                initiator: initiator,
                trickle: false,
                stream: stream
            })
        
            ctx.peer.on('signal', function (data) {
                console.log(data);
                ctx.userId = data;
                ctx.socket.emit('connect-video', {data: data});
            })

            ctx.peer.on('stream', (stream) => {
                var video = document.createElement('video')
                document.getElementById('partner-video').appendChild(video)
                try {
                    video.srcObject = stream;
                } catch (error) {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.play()
            })

            if(data != null) {
                if (data.data.data.type == 'offer') {
                    ctx.peer.signal(data.data.data);
                }
            }
        });
    }

    connect(data) {
        this.peer.signal(data)
    }
    
    getId() {
        return this.userId;
    }
}
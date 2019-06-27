<template>
<div class="room">
    <div class="editor-wrapper">
        <editor v-bind:roomNumber="roomNumber" v-bind:socket="socket" class="editor-block"></editor>
    </div>
    <div class="userchat">
        <div class="messages">
            <p class='message' v-bind:key='message' v-for='(message) in messages'>{{ message }}</p>
        </div>
        <div class='send-messages'>
            <input type="text" v-model='newMessage'>
            <button @click="sendMessage()">Send</button>
        </div>
    </div>
</div>
</template>
<script>
// Import components
import Editor from './Editor.vue';

// Import socket.io
import io from 'socket.io-client';
import config from '../config.js';

export default {
    data() {
        return {
            socket: '',
            messages: [],
            newMessage: ''
        }
    },
    created() {
        if ( this.$store.state.user) {
            console.log(this.roomNumber);
            this.socket = io.connect(`${config.nodeEndpoint}${this.roomNumber}`, { transports: ['websocket'] });
            console.log(this.socket)
            this.socket.on('message', (msg) => {
                this.messages.push(`${msg.user}: ${msg.msg}`);
            });

        } else {
            this.$router.push({name: 'home'})
            alert('Please login before joining room')
        }
    },
    destroyed() {
        this.socket.close();
    },
    methods: {
        sendMessage() {
            if ( this.socket != '') {
                this.socket.emit('message', {user: this.username, msg: this.newMessage});
                console.log(this.newMessage);
            } else {
                this.messages.push('Error: You are not connected');
            }
        }
    },
    computed: {
        /* Get room number from params */
        roomNumber() {
            return this.$route.params.id;
        },

        username() {
            return this.$store.state.user.username;
        }
    },
    components: {
        Editor
    }
}
</script>
<style>
.room {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    min-width: 300px;
}

.editor-wrapper {
    width: 100%;
    min-width: 300px;
    height: calc(80vh - 1px);
}

.editor-block {
    height: 100%;
}

.userchat {
    width: calc(100%);
    height: calc(15vh);
    background: #272822;
}

.messages {
    height: 80%;
    overflow-y: auto;
    text-align: left;
}

.send-messages {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20%;
}
</style>
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
            this.socket = io(`https://blueboard-node.herokuapp.com/${this.roomNumber}`, { transports: ['websocket'] });

            this.socket.on('message', (msg) => {
                this.messages.push(`${msg.user}: ${msg.msg}`);
            });

        } else {
            this.$router.push({name: 'home'})
            alert('Please login before joining room')
        }
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
    width: 80vw;
    min-width: 300px;
    height: 60vh;
}

.userchat {
    width: 100%;
    height: 200px;
    background: #272822;
}

.messages {
    height: 80%;
    overflow-y: auto;
    text-align: left;
    padding: 0px 20px;
}

.send-messages {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20%;
}
</style>
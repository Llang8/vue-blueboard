<template>
<div>
    <div class="top-bar">
        <h1>BlueBoard - Room: {{ roomNumber }}</h1>
        <h1 style="text-align: right;"><router-link to='/'>Home</router-link></h1>
    </div>
    <div class="content-grid">
        <div class="col1">
        <editor class="editor-block"></editor>
        </div>
        <div class="col2">
            <div class="videochat"></div>
            <div class="videochat"></div>
            <div class="userchat">
                <div class="messages">
                    <p class='message' v-for='message in messages'>{{ message }}</p>
                </div>
                <div class='send-messages'>
                    <input type="text" v-model='newMessage'>
                    <button @click="sendMessage()">Send</button>
                </div>
            </div>
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
            this.socket = io(`http://localhost:5000/${this.roomNumber}`, { transport : ['websocket'] });

            this.socket.on('message', (msg) => {
                this.messages.push(`${msg.user}: ${msg.msg}`);
            });

            this.socket.emit('set username', this.$store.state.username);
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
.top-bar {
    display: flex;   
    align-items: center;
    padding-left: 10px;
    background: rgb(87, 73, 112);
    width: calc(100vw - 10px); /* Calculate width minus padding */
    height: 50px;
}

.top-bar > h1 {
    margin-right: 20px;
    font-size: 20px;
}

.content-grid {
    height: calc(100vh - 50px);
    width: 100%;
    display: flex;
}

.col1 {
    height: 100%;
    width: 50%;
}

.col2 {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
}

.editor-block {
    height: 100%;   
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

.videochat {
    width: auto;
    height: 40%;
    background: grey;
}
</style>
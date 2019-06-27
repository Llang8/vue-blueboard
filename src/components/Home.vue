<template>
<div id="home">
    <div class="content">
        <h1>BlueBoard</h1>
        <input v-if="user !=null" type="text" id="room-number" v-model='roomNumber' placeholder="Enter room number...">
        <button v-if="user != null" @click="joinRoom()">Join Room</button>
        <button v-if="user != null" @click="createRoom()">Create Room</button>
        <p style="color: black;" v-else>Login to create a room...</p>   
        <button @click="practice()">Practice Coding</button>
        <button v-if="this.$store.state.user == null" @click="login()">Login</button>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import config from '../config';

export default {
    name: 'home',
    data() {
        return {
            roomNumber: ''
        }
    },
    methods: {
        /* Join Room of Room Number */
        joinRoom() {
            axios({url: `${config.nodeEndpoint}checkExists/${this.roomNumber}`, method:'get', timeout: 8000})
                .then((data)=> {
                    console.log(data.data)
                    if(data.data == 'exists') {
                        this.$router.push({name:'room', params:{id:this.roomNumber}});
                    } else {
                        alert(`This room doesn't exist.`)
                    }
                })
        },
        practice() {
            this.$router.push({name:'practice'});
        },
        login() {
            this.$router.push({name:'login'});
        },
        createRoom() {
            axios({url: `${config.nodeEndpoint}createRoom/${this.roomNumber}`, method:'get', timeout:8000})
                .then((data)=> {
                    if(data.data == 'Error: Room ID not available') {
                        alert('Room already exists, choose a new room.')
                    } else {
                        this.$router.push({name:'room', params:{id:this.roomNumber}})
                    }
                })
                .catch(error =>  console.error(error));
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    }
}
</script>
<style>
#home {
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x:hidden;
}
.content {
    background: white;
    padding: 25px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content > h1 {
    margin: 5px;
    color: rgb(58, 47, 78);
}

.content > input {
    margin: 5px;
    border: 0;
    border-bottom: 1px solid rgb(58, 47, 78);
    color: rgb(58, 47, 78);
}

.content > button {
    width: 200px;
    margin: 5px 0;
}
</style>
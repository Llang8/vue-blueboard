<template>
<div id="home">
    <div class="content">
        <h1>BlueBoard</h1>
        <input type="text" id="room-number" v-model='roomNumber' placeholder="Enter room number...">
        <button @click="joinRoom()">Join Room</button>
        <button @click="practice()">Practice Coding</button>
        <button v-if="this.$store.state.user == null" @click="login()">Login</button>
    </div>
</div>
</template>
<script>
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
            this.$router.push({name:'room', params:{id:this.roomNumber}});
        },
        practice() {
            this.$router.push({name:'practice'});
        },
        login() {
            this.$router.push({name:'login'});
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
    height: 100vh;
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
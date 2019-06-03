<template>
<div>
    <div class="content">
        <h1>BlueBoard</h1>
        <input type="text" id="room-number" v-model='roomNumber' placeholder="Enter room number...">
        <button @click="joinRoom()">Join Room</button>
        <button @click="practice()">Practice Coding</button>
        <button @click="login()">Login</button>
    </div>
</div>
</template>
<script>
export default {
    
}
</script>
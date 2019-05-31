<template>
<div>
    <div class="top-bar">
        <h1>BlueBoard - Room: {{ roomNumber }}</h1>
    </div>
    <div class="content-grid">
        <div class="col1">
        <editor class="editor-block"></editor>
        </div>
        <div class="col2">
            <div class="videochat"></div>
            <div class="videochat"></div>
            <div class="userchat"></div>
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

        }
    },
    created() {
    },
    computed: {
        /* Get room number from params */
        roomNumber() {
            return this.$route.params.id;
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
    height: 20%;
}

.videochat {
    width: auto;
    height: 40%;
    background: grey;
}
</style>
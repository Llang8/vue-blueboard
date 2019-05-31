<template>
<div>
    <div class="top-bar">
        <h1>BlueBoard - Practice Room</h1>
    </div>
    <div class="content-practice">
        <div class="check-incorrect" v-if='checkResponse'>{{checkResponse}}</div>
        <div class="editor-controls">
            <button @click="newPrompt()">New Prompt</button>
            <button @click="checkResult()">Check</button>
        </div>
        <div class="prompt">
            <h1>Prompt:</h1>
            <p>{{ prompt.prompt }}</p>
        </div>
        <editor v-bind:prompt="prompt" class="editor-practice"></editor>
    </div>
</div>
</template>
<script>
// Import components
import Editor from './Editor.vue';

// Import Prompt Handler
import { PromptHandler } from '../lib/promptHandler';

export default {
    data() {
        return {
            promptHandler: null,
            prompt: '',
            checkResponse: ''
        }
    },
    methods: {
        /************************************** 
        * Gets random prompt from promptHandler
        **************************************/
        newPrompt() {
            this.prompt = this.promptHandler.getPrompt();
        },
        /*************************************
        * Checks global state for current result
        * and checks it against the expected
        *************************************/ 
        checkResult() {
            // If result is correct
            if ( this.$store.state.result == this.prompt.expected) {
                this.checkResponse = `Your result: ${this.prompt.expected} is correct`;
            // If code hasn't been run yet or is equal to null
            } else if ( this.$store.state.result == '') {
                this.checkResponse = "Received null, make sure you run your code before checking"
            // If result is not null but also not correct
            } else {
                this.checkResponse = `Incorrect. Expected: ${this.prompt.expected}. Received: ${this.$store.state.result}`;
            }
        }
    },
    /* Set initial prompt */
    created() {
        this.promptHandler = new PromptHandler();
        this.prompt = this.promptHandler.getPrompt();
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
.content-practice {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.prompt {
    background: #272822;
    min-height: 50px;
    width: 80%;
    min-width: 400px;
    border-bottom: 1px solid #393a33;
}

.editor-controls {
    margin: 10px;
}

.editor-practice {
    width: 80%;
    min-width: 400px;
    height: 80vh;
    min-height: 400px;
}
</style>
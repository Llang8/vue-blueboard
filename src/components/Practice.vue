<template>
<div>
    <div class="top-bar">
        <h1>BlueBoard - Practice Room</h1>
        <h1><router-link to="/">Home</router-link></h1>
    </div>
    <div class="content-practice">
        <div class="check-incorrect" v-if='checkResponse'>{{checkResponse}}</div>
        <div class="editor-controls">
            <select v-model="difficulty" id="practice-difficulty">
                <option value="1">Easiest</option>
                <option value="2">Easy</option>
                <option value="3">Medium</option>
                <option value="4">Hard</option>
                <option value="5">Hardest</option>
            </select>
            <button @click="newPrompt()">New Prompt</button>
            <button @click="checkResult()">Check</button>
        </div>
        <div class="prompt" v-if="prompt">
            <h1>Prompt:</h1>
            <p>{{ prompt.body }}</p>
            <!-- Set v-bind prompt to pass in prompt, set key to prompt.name so that if name changes editor updates values -->
            <editor v-bind:prompt="prompt" :key="prompt.id" class="editor-practice"></editor>
        </div>
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
            checkResponse: '',
            difficulty: '1'
        }
    },
    methods: {
        /************************************** 
        * Gets random prompt from promptHandler
        **************************************/
        newPrompt() {
            // Save context
            var ctx = this;
            this.promptHandler.getPrompt(this.difficulty).then(res => {
                // Reset editor value, switch escaped newlines to regular new lines
                var editor_value = JSON.stringify(res.editor_value)
                res.editor_value = editor_value.replace(/\\n/g, '\n').replace(/\\/g, '')    
                // Get rid of double quotes on ends from JSON.stringify
                res.editor_value = res.editor_value.slice(1,res.editor_value.length-1)
                ctx.prompt = res;
            })
            console.log(this.prompt)
        },
        /*************************************
        * Checks global state for current result
        * and checks it against the expected
        *************************************/ 
        checkResult() {
            // If result is correct
            if ( this.$store.state.result == this.prompt.expected_value) {
                this.checkResponse = `Your result: ${this.prompt.expected_value} is correct`;
            // If code hasn't been run yet or is equal to null
            } else if ( this.$store.state.result == '') {
                this.checkResponse = "Received null, make sure you run your code before checking"
            // If result is not null but also not correct
            } else {
                this.checkResponse = `Incorrect. Expected: ${this.prompt.expected_value}. Received: ${this.$store.state.result}`;
            }
        }
    },
    /* Set initial prompt */
    created() {
        this.promptHandler = new PromptHandler();
        var ctx = this;
        this.promptHandler.getPrompt(this.difficulty).then(res => {
            // Reset editor value, switch escaped newlines to regular new lines
            console.log(JSON.stringify(res.expected_value));
            var editor_value = JSON.stringify(res.editor_value)
            res.editor_value = editor_value.replace(/\\n/g, '\n').replace(/\\/g, '')
            // Get rid of double quotes on ends from JSON.stringify
            res.editor_value = res.editor_value.slice(1,res.editor_value.length-1)
            ctx.prompt = res;
        })
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
    justify-content: space-between;
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

.top-bar > h1 {
    margin: 0;
    width: 300px !important;
}

.top-bar > h1 > a {
    color: white;
    text-decoration: none;
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
    width: 100%;
    min-width: 400px;
    height: 70vh;
    min-height: 400px;
}
</style>
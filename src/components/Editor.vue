<template>
<div>
    <div id="editor">// Enter Code Here, output should be set to a variable called result 
// LANGUAGE IS JAVASCRIPT 
<span v-if='prompt'>{{ prompt.editor_value }}</span>
    </div>
    <div id="editor-break">
        <h1>Output:</h1>
        <button @click="runCode()">Run Code</button>
    </div>
    <div id="result">
        <!-- If result is valid print result, else print error -->
        <span  v-if="result !== 'undefined'">{{ result }}</span>
        <span v-else>Error: result is undefined, make sure to save your result in variable result</span>
    </div>
</div>
</template>

<script>
import * as ace from 'ace-builds/src-noconflict/ace';
import { AceHandler } from '../lib/aceHandler';

export default {
    // Pass in prompt for practice page
    props: ['prompt', 'roomNumber','socket'],
    data () {
        return {
            editor: null,
            handler: new AceHandler(),
            result: '',
            setValue: false
        }
    },
    /************************************************************* 
    *  Run this code after HTML is mounted to DOM so that
    *  the editor div exists before trying to attach to ACE build 
    *************************************************************/
    mounted() {
        ace.config.set('basePath','../node_modules/ace-builds/src-noconflict');
        this.editor = ace.edit('editor');
        this.editor.setTheme('ace/theme/monokai');
        this.editor.session.setMode('ace/mode/javascript');
        this.editor.gotoLine(3,0);

        // If socket exists, set on editor change handler
        if ( this.socket) {
            this.socket.on('editor changed', (value) => {
                // Get current cursor position so that entire text isn't overwritten when changed
                var cursorPos = this.editor.getCursorPosition();

                this.setValue = true;
                // Set new value
                this.editor.setValue(value.editorValue,cursorPos);

                // Reset cursor position
                this.editor.gotoLine(cursorPos.row + 1,cursorPos.column);
            })
        }

        this.editor.on('change', () => {
            if ( this.socket && !this.setValue) {
                console.log(this.editor.getValue());
                this.socket.emit('editor changed', {editorValue: this.editor.getValue()});
            } else {
                this.setValue = false;
            }
        });

    },
    methods: {
        /*********************************************
         * Call AceHandler class to run the code and
         * return output. Save output in result variable
         *********************************************/
        runCode() {
            let code = this.editor.getValue();
            this.result = this.handler.runCode(code).result;

            // Store globally for checking in Practice page
            this.$store.state.result = this.result;
        },
    },
    computed: {
        editorValue() {
            if (this.editor != null) {
                return this.editor.getValue();
            } else {
                return '';
            }
        }
    },
    watch: {
/*         editorValue(value) {
            console.log(value);
            if ( this.roomNumber && this.socket) {
                // console.log(this.editor.getValue());
                this.socket.emit('editor changed', {editorValue: this.editor.getValue()});
            }
        } */
    }
}
</script>

<style>
#editor {
    width: 100%;
    height: 80%;
    min-height: 300px;
}

.editor-break > h1 {
    margin: 0;
    text-align: left;
    width: calc(100% - 20px); /* Get width minus the padding */
    font-size: 20px;
    padding: 10px;
    color: white;
}
#result {
    width: calc(100% - 20px); /* Get width minus padding */
    height: 15%; /* Set height to 15% of editor box */
    min-height: 50px;
    padding: 10px; 
    text-align: left;
    background: #272822;
    color: white;
    overflow-y: auto;
}

#editor-break {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: #272822;
    border-bottom: 1px solid #393a33;
}

#editor-break > button {
    width: 100px;
    height: 25px;
}

</style>

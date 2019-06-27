<template>
<div class="editor-flex">
    <div id="editor">// Enter Code Here 
// LANGUAGE IS JAVASCRIPT 
        <span v-if='prompt'>{{ prompt.editor_value }}</span></div>
    <div id="shell">
      <div class="shell-content">
        <p>Interactive JavaScript Shell - Type 'help' for a list of commands</p>
      </div>
      <div class="input-line"><span style="font-size: 10px;">></span>
        <form class="command-form" v-on:submit.prevent="runCommand()">
          <input v-model="shellInput" type="text" >
        </form>
      </div>
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
            aceHandler: null,
            result: '',
            shellInput: '',
            setValue: false,
            commands: ['help - see a list of commands', 
                'random - returns a random float between 0 and 1', 
                'clear - clears shell',
                "run VARIABLES - runs all code in the editor and prints the value of the variable names past",
                "You can call a function from here by calling it as you normally would."]
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

        this.aceHandler = new AceHandler();

        // If socket exists, set on editor change handler
        if ( this.socket) {
            this.socket.on('editor changed', (value) => {
                // Get current cursor position so that entire text isn't overwritten when changed
                var cursorPos = this.editor.getCursorPosition();

                this.setValue = true;
                // Set new value
                this.editor.setValue(value.editorValue,cursorPos);


                this.setValue = false;
                // Reset cursor position
                this.editor.gotoLine(cursorPos.row + 1,cursorPos.column);
            })
        }

        this.editor.on('change', () => {

            console.log(this.setValue);
            if ( this.socket && !this.setValue) {
                this.socket.emit('editor changed', {editorValue: this.editor.getValue()});
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
        runCommand() {
            var command = this.shellInput.split(" ")[0];

            var par = document.createElement('p')
            par.appendChild(document.createTextNode('> ' + this.shellInput));
            par.style = 'input';
            document.getElementsByClassName('shell-content')[0].appendChild(par);

            if( command.toLowerCase() === 'help') {
                this.commands.forEach((command) => {
                this.printOutput(command);
                });
            } else if( command.toLowerCase() === 'clear') {
                document.getElementsByClassName('shell-content')[0].innerHTML = '<p>Shell content cleared</p>'
            } else if( command.toLowerCase() === 'random') {
                this.printOutput(Math.random())
            } else if( command.toLowerCase() === 'run') {
                var args = this.shellInput.split(" ").splice(1);
                if(args.length == 0) {
                    args = ['result']
                }
                this.aceHandler.runCode(this.editor.getValue(), args).forEach((result) => {
                    this.printOutput(result);
                    var value = result.split(": ");
                    value.shift();
                    console.log(value.join(": "));
                    this.$store.state.result = value;
                });
            } else if( this.shellInput.includes('(') && this.shellInput.includes(')')) {
                var functionName = this.shellInput.split('(')[0];
                var functionArgs = this.shellInput.split('(')[1];
                functionArgs = functionArgs.substring(0,functionArgs.length-1).split(",");
                // Convert to correct variable type
                functionArgs = functionArgs.map((arg) => {
                arg = arg.trim();
                
                // If string remove quotes
                if(arg.charAt(0) == '"' || arg.charAt(arg.length-1) == "'") {
                    return arg.substring(1,arg.length-1);
                
                // If number param convert
                } else if (arg.charAt(0) != "{" ) {
                    return parseInt(arg);
                } 
                })

                var result = this.aceHandler.runFunction(this.editor.getValue(), functionName, functionArgs);
                this.printOutput(result);
            } 
            else {
                this.printOutput("Error: Command Not Found. Type 'help' for a list of commands.");
            }

            // Clear shellInput
            this.shellInput = '';

            // Scroll shell with data
            document.getElementById('shell').scrollTop = document.getElementById('shell').scrollHeight;
        },
        printOutput(str) {
            var par = document.createElement('p')
            par.appendChild(document.createTextNode(str));
            par.className = 'output';
            document.getElementsByClassName('shell-content')[0].appendChild(par); 
        }
    }
}
</script>

<style>

.editor-flex {
    display: flex;
    height: 100%;
}

#editor {
    width: 60%;
    height: 100%;
    min-height: 500px;
    font-size: 18px;
}

#shell {
    font-family: 'sans-serif';
    background: rgb(50,50,50);
    color: white;
    padding: 25px;
    height: calc(100% - 50px);
    min-height: 450px;
    width: calc(40% - 50px);
    overflow-y: auto;
    text-align: left;
}

.command-form {
    display:inline;
}

.command-form > input {
    background: rgba(0,0,0,0);
    border: 0;
    color: white;
    margin: 0;
    width: 80%;
    padding: 5px;
}

.output {
    padding-left: 10px;
    color: rgb(200,200,200);
    margin: 5px;
}

@media screen and (max-width: 800px) {
    .editor-flex {
        flex-direction: column;
    }

    #editor {
        width: 100%;
    }

    #shell {
        width: 100%;
    }

    .result-wrapper {
        width: 100%;
        height: 25%;
    }
}

</style>

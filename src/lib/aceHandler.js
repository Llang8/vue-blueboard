// Imports
const vm = require('vm');
const util = require('util');

/*
*   Handles code from Ace Editor
*/
export class AceHandler {
    constructor() {}

    runCode(code) {
        const script = new vm.Script(code);

        const sandbox = {};
        script.runInNewContext(sandbox);
    
        return {result:util.inspect(sandbox.result)}
    }
}
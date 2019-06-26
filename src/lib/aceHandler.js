// Imports
const vm = require('vm');
const util = require('util');

/*
*   Handles code from Ace Editor
*/
export class AceHandler {
    constructor() {}

    runCode(code, variables) {

        const script = new vm.Script(code);

        const sandbox = {};
        script.runInNewContext(sandbox);
    
        var results = [];
        
        variables.forEach((variable) => {
            results.push(variable + ': ' + util.inspect(sandbox[variable]));
        })

        return results
    }

    runFunction(code, functionName, variables) {
        const script = new vm.Script(code);

        const sandbox = {};
        script.runInNewContext(sandbox);
        console.log(...variables);
        console.log(variables);
        return util.inspect(sandbox[functionName](...variables));        
    }
}
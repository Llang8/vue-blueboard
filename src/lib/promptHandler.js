export class PromptHandler {
    
    
    constructor() {

        // Temporary prompts variable (This will be replaced with database call to get a long list of prompts)
        this.prompts = [{
            prompt: 'Return value of 10 using result = 10; Expected result: 10',
            expected: 10
        }, 
        {
            prompt: 'Return value of 20 using result = 20; Expected result: 20',
            expected: 20
        }];
    }

    /* Returns random prompt from list. In future should hit API and
    *  return a prompt from a database.
    */
    getPrompt() {
        return this.prompts[Math.floor(Math.random() * this.prompts.length)]
    }


}
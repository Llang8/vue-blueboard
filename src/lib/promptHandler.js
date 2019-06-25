var axios = require('axios');
var config = require('../config.js');

export class PromptHandler {
    
    
    constructor() {
    }

    /* 
    *  Returns random prompt from list that matches 
    *  the passed in difficulty. In future should 
    *  hit API and return a prompt from a database.
    */
    getPrompt(difficulty) {
        console.log(`${config.flaskEndpoint}getRandomPrompt/${difficulty}`)
        return axios({ url: `${config.flaskEndpoint}getRandomPrompt/${difficulty}`, method:'get', timeout:8000})
            .then(response => response.data)
            .catch(error =>  console.error(error))
    }


}
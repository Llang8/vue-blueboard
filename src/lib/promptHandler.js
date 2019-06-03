var axios = require('axios');

export class PromptHandler {
    
    
    constructor() {

        // Temporary prompts variable (This will be replaced with database call to get a long list of prompts)
        // TODO: Find fix for below problems:
        // IMPORTANT: If expected result is a string put single quotes around it in the expected field.
        // IMPORTANT: If expected result is an array put spaces between numbers and brackets. EX: [ 2, 4, 6 ]
        // IMPORTANT: If expected result is a boolean make expected string value 'true' or 'false'
        this.prompts = [{
            id: 1,
            name: 'Remove String Spaces',
            prompt: 'Write a function that removes the spaces from a string and returns the result',
            editorValue: '\nfunction removeSpaces(input) {\n\n}\n\n// Expected result: "thequickbrownfoxjumpedoverthelazydog."\nresult = removeSpaces("the quick brown fox jumped over the lazy dog.");',
            difficulty: 1,
            expected: "'thequickbrownfoxjumpedoverthelazydog.'"
        },{
            id: 2,
            name: 'Square(n) Sum',
            prompt: 'Complete the square sum function so that it squares each number passed into it and then sums the results together.\nFor example, for [1, 2, 2] it should return 9 because 1^2 + 2^2 + 2^2 = 9.',
            editorValue: '\nfunction squareSum(input) {\n\n}\n\n// Expected result: 50\nresult = squareSum([0,3,4,5]);',
            difficulty: 1,
            expected: 50
        },{
            id: 3,
            name: 'Find numbers which are devisible by given number',
            prompt: 'Complete the function which takes two arguments and returns all numbers which are divisible by the given divisor. First argument is an array of numbers and the second is the divisor.',
            editorValue: '\nfunction divisibleBy(inputArr, divisor) {\n\n}\n\n// Expected result: [ 2, 4, 6 ]\nresult = divisibleBy([1,2,3,4,5,6],2);',
            difficulty: 2,
            expected: '[ 2, 4, 6 ]'
        },{
            id: 4,
            name: 'Summation',
            prompt: 'Write a program that finds the summation of every number from 1 to num. The number will always be a positive integer greater than 0.',
            editorValue: '\nfunction summation(num) {\n\n}\n\n// Expected result: 36\nresult = summation(8);',
            difficulty: 2,
            expected: '36'
        },{
            id: 5,
            name: 'Args Count',
            prompt: 'Create a function called args_count that returns the number of arguments provided',
            editorValue: '\n// args_count(1, 2, 3) -> 3\n// args_count(1, 2, 3, 10) -> 4\n\n\n\n\n// Expected result: 8\nresult = args_count(1,2,3,4,5,6,7,8);',
            difficulty: 3,
            expected: 8
        },{
            id: 6,
            name: 'Sexy Primes',
            prompt: 'Sexy primes are pairs of two primes that are 6 apart. In this problem, your job is to complete the function sexy_prime(x, y) which returns true if x & y are sexy, false otherwise.',
            editorValue: '\n// sexy_prime(5, 11) -> True\n// sexy_prime(5,7) -> False\n\nfunction sexy_prime(num1,num2) {\n\n}\n\n\n\n// Expected result: True\nresult = sexy_prime(61,67);',
            difficulty: 3,
            expected: 'true'
        },{
            id: 7,
            name: 'Convert String to Camel Case',
            prompt: 'Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case).',
            editorValue: '\n// toCamelCase("the-stealth-warrior") -> "theStealthWarrior" \n// toCamelCase("The_Stealth_Warrior") -> "TheStealthWarrior"\n\nfunction toCamelCase(str) {\n\n}\n\n\n\n// Expected result: "theBuckbeakRider"\nresult = toCamelCase("the_Buckbeak_rider");',
            difficulty: 4,
            expected: "'theBuckbeakRider'"
        },];
    }

    /* 
    *  Returns random prompt from list that matches 
    *  the passed in difficulty. In future should 
    *  hit API and return a prompt from a database.
    */
    getPrompt(difficulty) {
        console.log(this.prompts[0])
        return axios({ url: `http://127.0.0.1:5000/getRandomPrompt/${difficulty}`, method:'get', timeout:8000})
            .then(response => response.data)
            .catch(error =>  console.error(error) )
    }


}
const openAi = require('../config/openai.js')
const colors = require('colors')
const readlineSync = require('readline-sync')


const chatbot = async (request, response) => {
    console.log(colors.bold.red('WELCOME TO THE EA-CHATBOT'));
    console.log(colors.bold.yellow('Alright, let"s get started')); 

    try {
        const { chats } = request.body;
        const result = await openAi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a rude assistant.' },
                // { role: 'user', content: userInput },
                // { role: 'assistant', content: 'Bitch do not be lazy, do some research.' }
                ...chats,
            ],
        });
    
        response.json({
            output: result.data.choices[0].message,
        });
    } catch (error) {
        // Handle the error here
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred' });
    }
    
}

module.exports = chatbot
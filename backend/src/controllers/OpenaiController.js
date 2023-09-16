const openAi = require('../config/openai.js')
const colors = require('colors')
const readlineSync = require('readline-sync')


const chatbot = async (request, response) => {
    console.log(colors.bold.red('WELCOME TO THE EA-CHATBOT'));
    console.log(colors.bold.yellow('Alright, let"s get started')); 

    try {
        const { chats } = request.body;
        const messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            // {"role": "user", "content": "Where was it played?"},
            // ...chats
            //  ...chats.map(chat => ({ role: "user", content: chat }))
            
        ]

        chats.forEach(chat => {
            if (typeof chat === 'string') {
              messages.push({ role: "user", content: chat });
            }
          })

        const result = await openAi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages:messages
        });
    
        response.json({
            // output: result.data.choices[0].message,
            output: result.choices[0].message.content
        });
    } catch (error) {
        // Handle the error here
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred' });
    }
    
}

module.exports = chatbot
const openAi = require('../config/openai.js')
const colors = require('colors')

const chatbot = async (request, response) => {
    console.log(colors.bold.red('WELCOME TO THE EA-CHATBOT'));
    console.log(colors.bold.yellow('Alright, let"s get started')); 
    
    try {
        const { chats } = request.body;

        const messages = [
                    // { role: 'system', content: 'You are a friendly assistant here to answer questions.' },
                    // { role: 'user', content: 'Hi' },                    
                    // { role: 'user', content: 'Hi, I need financial advice. Can you help me with budgeting?' }, 
                        { role: 'system', content: 'You are a financial advisor.' },
                        // { role: 'user', content: 'Hi, I need assistance planning a budget.' },
                        // { role: 'assistant', content: "Sure, I'd be happy to help you plan a budget. To get started, could you provide me with some information about your income and expenses?" },
                        // { role: 'user', content: 'I earn $4,000 per month and have monthly expenses like rent, groceries, and utilities. How can I create a budget to save more?' },                                           
        ];
       
        chats.forEach(chat => {
            if (typeof chat === 'string') {
              messages.push({ role: "user", content: chat });
            }
          })

        const result = await openAi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.8,
            // max_tokens: 1024,
        });
    
        response.json({
            output: result.choices[0].message.content
        });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred' });
    }
    
}

  module.exports = chatbot
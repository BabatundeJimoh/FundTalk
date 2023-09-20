const openAi = require('../config/openai.js')
const colors = require('colors')

const chatbot = async (request, response) => {
    console.log(colors.bold.red('WELCOME TO THE EA-CHATBOT'));
    console.log(colors.bold.yellow('Alright, let"s get started')); 
    
    try {
        const { chats } = request.body;
       
        // chats.forEach(chat => {
        //     if (typeof chat === 'string') {
        //       messages.push({ role: "user", content: chat });
        //     }
        //   })

        const result = await openAi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: 'You are a helpful assistant' }],
            temperature: 0.5,
            max_tokens: 1024,
        });
    
        response.json({
            output: result.choices[0].message.content
        });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred' });
    }
    
}





// const chatbot = async (req, res) => {
//     try {
//       const { chats } = req.body;
  
//       // Format messages for GPT-3 API
//       const messages = chats.map((chat) => ({
//         role: chat.role,
//         content: chat.content,
//       }));
  
//       // Request to the GPT-3 API
//       const response = await axios.post(
//         'https://api.openai.com/v1/engines/davinci-codex/completions',
//         {
//           messages,
//           max_tokens: 50, // Adjust as needed
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//           },
//         }
//       );
  
//       // Extract the assistant's reply
//       const assistantReply = response.data.choices[0].message.content;
  
//       res.json({ output: assistantReply });
//     } catch (error) {
//       console.error('Error in chatbot route:', error);
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   };

  module.exports = chatbot
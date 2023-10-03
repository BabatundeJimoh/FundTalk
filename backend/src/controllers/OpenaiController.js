const openAi = require('../config/openai.js')
const colors = require('colors')
const axios = require('axios')
require('dotenv').config()

const chatbot = async(req, res) => {
    try {
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 100,
        };

        const headers = {
            "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
            "Content-Type": 'application/json',
        };

        console.log("Request Data:", requestData);

        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers });

        console.log("Response Status Code:", response.status);
        console.log("Response Data:", response.data);

        res.send(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
}


  module.exports = chatbot
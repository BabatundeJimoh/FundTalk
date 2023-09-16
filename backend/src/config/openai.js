// import  OpenAI  from 'openai'
// import dotenv from 'dotenv'
// dotenv.config()

// const  { OpenAI }  = require('openai')
const OpenAI = require('openai')
require('dotenv').config()
const aiKey = process.env.OPENAI_KEY
const organisationKey = process.env.ORG_KEY

const openAi = new OpenAI({
    apiKey: aiKey,
    organization: organisationKey
})

// const openAi = new OpenAIApi(configuration)

module.exports = openAi
// export default openAi
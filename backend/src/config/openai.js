const OpenAI = require('openai')
require('dotenv').config()
const aiKey = process.env.OPENAI_KEY
const organisationKey = process.env.ORG_KEY

const openAi = new OpenAI({
    apiKey: aiKey,
    organization: organisationKey
})


module.exports = openAi

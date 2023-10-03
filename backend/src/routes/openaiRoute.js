const express = require('express')
const router = express.Router()

const chatbot = require('../controllers/OpenaiController')

router.post('/chatbot', chatbot)

module.exports = router
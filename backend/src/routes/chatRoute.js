const express = require('express')
const router = express.Router()

const chatHistory = require('../controllers/ChatController')

router.post('/messages', chatHistory.saveMessage)
router.get('/messages', chatHistory.getChatHistory)
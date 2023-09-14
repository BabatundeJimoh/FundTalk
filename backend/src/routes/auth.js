const express = require('express')
const router = express.Router()


const { registerUser, loginUser } = require('../controllers/AuthController')
const { userVerification } = require('../middlewares/AuthMiddleware')
const createChatCompletion = require('../controllers/OpenaiController')

router.post('/', userVerification)

router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/dashboard', createChatCompletion)

module.exports = router
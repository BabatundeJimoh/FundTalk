const express = require('express')
const router = express.Router()


const { registerUser, loginUser, logoutUser } = require('../controllers/AuthController')
const { userVerification } = require('../middlewares/AuthMiddleware')
const createChatCompletion = require('../controllers/OpenaiController')

router.post('/', userVerification)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/dashboard', createChatCompletion)

module.exports = router
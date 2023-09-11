const express = require('express')
const router = express.Router()


const { registerUser, loginUser } = require('../controllers/AuthController')
const { userVerification } = require('../middlewares/AuthMiddleware')

router.post('/', userVerification)

router.post('/register', registerUser)
router.post('/login', loginUser)


module.exports = router
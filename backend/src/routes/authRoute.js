const express = require('express')
const router = express.Router()


const { registerUser, loginUser, logoutUser } = require('../controllers/AuthController')
const { userVerification } = require('../middlewares/AuthMiddleware')


router.post('/', userVerification)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


module.exports = router
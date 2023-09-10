const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const cors = require('cors')
const jwtSecret = process.env.JWT_SECRET
const User = require('../models/User')

const authMiddleware = (request, response, next) => {
    const token = request.cookies.token
    if (!token) {
        return response.status(401).json({ message: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        request.userId = decoded.userId
        next()
    } catch (error) {
        response.status(401).json({ message: 'Unauthorized'})
    }
}

router.post('/register', async (request, response) => {
    try {
        const { name, password, email } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)
        try {
            const user = await User.create({ email, name, password: hashedPassword})
            response.status(201).json({ message: 'User Created Successfully', user})
        } catch (error) {
            if (error.code === 11000) {
                response.status(409).json({ message: 'User already exists'})
            }
            response.status(500).json({ message: 'Internal Server Error'})
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal Server Error', error: error.message})
    }
})

router.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body

        if (!username || !password) {
            return response.status(401).json({ message: 'Invalid Credentials' })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return response.status(401).json({ message: 'Invalid Credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Invalid Credentials'})
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret)
        response.cookie('token', token, { httpOnly: true})

        response.status(200).json({ message: 'Login successful', user})
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal Server Error'})
    }

})


module.exports = router
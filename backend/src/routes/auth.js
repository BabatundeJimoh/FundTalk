const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const User = require('../models/User')

const authMiddleware = (request, response, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized'})
    }
}

router.post('/api/register', async (request, response) => {
    try {
        const { username, password, email } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)
        try {
            const user = await User.create({ email, username, password: hashedPassword})
            res.status(201).json({ message: 'User Created Successfully', user})
        } catch (error) {
            if (error.code = 11000) {
                res.status(409).json({ message: 'User already exists'})
            }
            res.status(500).json({ message: 'Internal Server Error'})
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/api/login', async (request, response) => {
    try {
        const { username, password } = request.body

        if (!username || !password) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials'})
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret)
        res.cookie('token', token, { httpOnly: true})

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error'})
    }

})


module.exports = router
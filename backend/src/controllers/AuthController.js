const User = require('../models/User')
const bcrypt = require('bcrypt')
const { createSecretToken } = require('../util/SecretToken')


const registerUser = async(request, response) => {
    try {
        const { name, password, email } = request.body
        // const newPassword = password
        // const saltRounds = 10
        // const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

        const existingUser = await User.findOne({ $or: [{ email }, { name }] })
        if (existingUser) {
            return response.status(409).json({ message: 'User already exists'})
        }

        const user = await User.create({ email, name, password })
        const token = createSecretToken(user._id);
        response.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        response.status(201).json({ message: 'User Created Successfully', success: true, user})

    } catch (error) {
        console.log(error);
        // response.status(500).json({ message: 'Internal Server Error', error: error.message})
        if (error.code === 11000) {
            response.status(409).json({ message: 'User already exists'})
        } else {
        response.status(500).json({ message: 'Internal Server Error'})
        }
    }
}

const loginUser = async(request, response) => {
    try {
        const { email, password } = request.body

        if (!email || !password) {
            return response.status(401).json({ message: 'All fields are required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return response.status(401).json({ message: 'Invalid Credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Invalid Credentials'})
        }

        const token = createSecretToken(user._id)
        response.cookie('token', token, {
            withCredentials: true, 
            httpOnly: false
        })

        response.status(200).json({ message: 'Login successful', success: true, user})
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal Server Error'})
    }
}

module.exports = { registerUser, loginUser }
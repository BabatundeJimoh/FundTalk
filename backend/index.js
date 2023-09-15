require('dotenv').config
const express = require('express')
const server = express()
const PORT = 3001 || process.env.PORT

const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cors = require('cors')

const connectDatabase = require('./src/config/database')
connectDatabase()

server.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieParser())
server.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

server.use('/', require('./src/routes/auth'))

server.listen(PORT, () => console.log(`Server is clean & live on Port ${PORT}`))
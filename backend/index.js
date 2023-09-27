require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000 

const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cors = require('cors')

const connectDatabase = require('./src/config/database')
connectDatabase()

server.use(cors({
    origin: ['*', 'https://codetrain-fundtalk.netlify.app', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieParser())
server.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))


server.get('/', (req, res) => {
  res.send('Fundtalk Server, nothing here!');
});

server.use('/users', require('./src/routes/authRoute'))
server.use('/openai', require('./src/routes/openaiRoute'))

server.listen(PORT, () => console.log(`The Server is clean & live on Port ${PORT}`))
require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT || 4000 

const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cors = require('cors')

const connectDatabase = require('./src/config/database')
connectDatabase()

server.use(cors({
    origin: ['https://finalfundtalk.onrender.com'],
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

// server.use((req, res, next) => {
//     res.cookie('connect.sid', req.cookies['connect.sid'], {
//       sameSite: 'None',
//       secure: true,
//     });
//     next();
//   });

server.get('/set-cookie', (req, res) => {
    res.cookie('token', process.env.JWT_SECRET, {
      sameSite: 'None',
      secure: true,     
    //   httpOnly: true,   
    });
    res.send('Cookie set');
});

server.get('/', (req, res) => {
  res.send('Fundtalk Server, nothing here!');
});

server.use('/', require('./src/routes/authRoute'))
server.use('/openai', require('./src/routes/openaiRoute'))

server.listen(PORT, () => console.log(`The Server is clean & live on Port ${PORT}`))
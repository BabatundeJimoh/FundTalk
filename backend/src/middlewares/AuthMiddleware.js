const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

// const userVerification = (request, response, next) => {
//     const token = request.cookies.token
//     if (!token) {
//         return response.status(401).json({ message: 'Unauthorized'})
//     }

//     try {
//         const decoded = jwt.verify(token, jwtSecret)
//         request.userId = decoded.userId
//         next()
//     } catch (error) {
//         response.status(401).json({ message: 'Unauthorized'})
//     }
// }

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    console.log('Received token:', token);
    console.log('jwtSecret:', jwtSecret);
    if (!token) {
      return res.json({ status: false })
    }
    jwt.verify(token, jwtSecret, async (err, data) => {
      if (err) {
       return res.json({ status: false })
      } else {
        const user = await User.findById(data.id)
        if (user) return res.json({ status: true, user: user.name })
        else return res.json({ status: false })
      }
    })
  }

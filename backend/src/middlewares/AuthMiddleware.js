const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

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

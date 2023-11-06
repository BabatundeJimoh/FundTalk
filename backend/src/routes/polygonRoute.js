const express = require('express')
const router = express.Router()

const stockData = require('../controllers/PolygonController')

router.get('/stockdata', stockData)

module.exports = router
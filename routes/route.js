const express = require('express')
const router = express.Router()
const mediaRoute = require('./media.route')

router.use('/', mediaRoute)

module.exports = router
const express = require('express')
const router = express.Router()
const atC2bController = require('../controllers/atC2b')

router.post('/c2b', atC2bController.initiateMobileCheckout)

module.exports = router
const express = require('express')
const router = express.Router()
const mpesaV1Controller = require('../controllers/mpesa_v1Controller')

router.get('/stk', mpesaV1Controller.c2b)

module.exports = router
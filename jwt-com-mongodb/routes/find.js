const express = require('express')
const router = express.Router()
const Find = require('../controllers/findController')

router.get('/', Find.findLogins)


module.exports = router
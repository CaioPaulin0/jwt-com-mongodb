const express = require('express')
const router = express.Router()
const contaController = require('../controllers/contaController')

router.post('/criar', contaController.insertConta)
router.post('/login', contaController.contaToken)
module.exports = router
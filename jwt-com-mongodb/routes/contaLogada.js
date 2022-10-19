const express = require('express')
const router = express.Router()
const contaLogadaController = require('../controllers/ContaLogadaController')
const login = require('../controllers/login')

router.get('/logado',  login.loginVerify, contaLogadaController.idLogado)
router.patch('/logado/adicionar', login.loginVerify, contaLogadaController.addValor)
router.patch('/logado/sacar', login.loginVerify, contaLogadaController.sacarValor)
router.patch('/logado/transferir', login.loginVerify, contaLogadaController.enviarValor)
module.exports = router
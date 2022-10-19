require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const DBmongo = // link do mongodb cloud //

const mongoose = require('mongoose')
mongoose.connect(DBmongo)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accpet, Authorization')
    
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    
    next()
})

const find = require('./routes/find')
const contaLogada = require('./routes/contaLogada')
const conta = require('./routes/conta')
app.use('/find',find)
app.use('/conta', conta)
app.use('/user', contaLogada)

module.exports = app
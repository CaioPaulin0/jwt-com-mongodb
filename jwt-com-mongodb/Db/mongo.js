const mongoose = require('mongoose')

const {Schema, model,} = mongoose

const dbSchema = new Schema(
    {
        "_id" : String,
        "email" : String,
        "senha" : String,
        "office": String,
        "valor" : Number
    },{versionKey: false}
)

const db = model('cadastro', dbSchema)

module.exports = db
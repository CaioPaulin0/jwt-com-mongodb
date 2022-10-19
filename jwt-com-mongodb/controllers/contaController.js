const db = require('../Db/mongo')
const jwt = require('jsonwebtoken')

exports.insertConta = async (req,res) => {
    try{
        const data = {
            _id: req.body.email,
            email: req.body.email,
            senha: req.body.senha,
            office: "user",
            valor: 0
        }

        const insert = db.insertMany(data)

        return res.status(201).send({mensagem: "criado com sucesso"})
    }
    catch(error){
        return res.status(405).send({error: error})
    }
}

exports.contaToken = async (req,res) => {
    try{
        const find = await db.findOne({"email" : req.body.email, "senha" : req.body.senha},{"email" : 1, "office" : 1})
        if(!find){
            return res.status(401).send({men: "não encontrado"})
        }
        else{
            const token = jwt.sign({id: find._id}, process.env.SECRET, {expiresIn: 600})
            return res.json({auth: true, token,})
        }

    }
    catch(error){
        return res.status(500).send({error: error})
    }
}

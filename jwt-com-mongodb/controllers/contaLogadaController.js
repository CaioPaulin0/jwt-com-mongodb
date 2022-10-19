const db = require('../Db/mongo')
const jwt = require('jsonwebtoken')

exports.idLogado = async (req,res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const convert = jwt.decode(token)
        const id = await convert.id

        const find = await db.find({"_id" : id},{"email" : 1, "valor" : 1})

        return res.status(200).send(find)
    }
catch(error){
    return res.status(401).send({error: error})
}
}

exports.addValor = async (req,res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const convert = jwt.decode(token)
        const id = await convert.id
        const valorAdd = req.body.valor

        if(valorAdd <= 0){
            return res.status(200).send({mensagem: 'Porfavor coloque um valor igual ou maior que "1"'})
        }else{
            
            const valor = await db.find({"_id" : id},{"_id": 0,"valor" : 1})
            const update = await db.updateMany({"_id" : id},
            {$set: {"valor": valor[0].valor + valorAdd}},{multi: true})
            
            return res.status(200).send({mensagem: "adicionado com sucesso"})
        }

        
    }
    catch(error){
        return res.status(400).send({error: error})
    }
}

exports.sacarValor = async (req,res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const convert = jwt.decode(token)
        const id = await convert.id

        const valor = await db.findOne({"_id" : id},{"_id": 0,"valor" : 1})

        const valorSacado = req.body.valor

        

        if(valorSacado > valor.valor){
            return res.status(200).send({mensagem: "valor alto"})
        }
        const update = await db.updateMany({"_id" : id},
        {$set: {"valor": valor.valor - valorSacado}},{multi: true})
        
        return res.status(200).send({mensagem: "sacado com sucesso"})
    
    }
    catch(error){
        return res.status(400).send({error: error})
    }
}

exports.enviarValor = async (req,res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const convert = jwt.decode(token)
        const id = await convert.id

        const meuId = await db.findOne({"_id" : id},{"_id": 0,"valor" : 1})

        const valor = await req.body.valor

        if(meuId.valor < valor){

            return res.status(200).send({mensagem: "saldo insuficiente"})

        }else if(valor < 0){
            return res.status(200).send({mensagem: 'Porfavor coloque um valor igual ou maior que "1"'})
        }
        else{
            const meuValor = await db.updateOne({"_id" : id},
            {$set: {"valor": meuId.valor - valor}},{multi: true})

            const pessoaId = await db.findOne({"_id" : req.body.pId},{"_id": 0,"valor" : 1})
            const pessoaValor = await db.updateOne({"_id" : req.body.pId},
            {$set: {"valor": pessoaId.valor + valor}},{multi: true})

            return res.status(200).send({mensagem: "enviado com sucesso"})
        }
    }
    catch(error){
        return res.status(400).send({error: error})
    }
}
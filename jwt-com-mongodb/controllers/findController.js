const db = require('../Db/mongo')

const jwt = require('jsonwebtoken')


exports.findLogins = async (req,res) => {
    try{
        const find = await db.find({},{"email" : 1, "office" : 1,"senha" : 1,"valor" : 1})
        return res.status(200).send(find)
    }
    catch(error){
        return res.status(500).send({error: error})
    }
}



const jwt = require('jsonwebtoken')

exports.loginVerify = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET)
        req.usuarios = decode
        next()
    }
    catch(error){
        return res.status(401).send('falha na autenticação')
    }
}
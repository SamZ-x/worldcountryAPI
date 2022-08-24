//history
//Aug 24, 2022 - created file

//verify the token
const jwt = require('jsonwebtoken')
const ErrorIndex = require('../error/index')

const auth = (req, res, next)=>{
    //get the token in header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new ErrorIndex.UnauthenticationError('Authentication invalid')
    }
    //remove 'bearer'
    const token = authHeader.split(' ')[1]
    //verfiy token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.key = {key:payload.key}
        next()
    } catch (error) {
        throw new ErrorIndex.UnauthenticationError('Authentication invalid')
    } 
}

module.exports = auth




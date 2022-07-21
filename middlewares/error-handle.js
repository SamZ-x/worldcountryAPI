//handle the error passed by other middleware
//send correct response with status code and message

//import customAPIError module
const {CustomAPIError} = require('../error/customAPIError')

const errorhandler = (err, req, res, next) =>{
    //send API error
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({success:false, message:err.message}) 
    }
    //send server error
    return res.status(500).json({success:false, message:`Server error - ${err.message}`})
}

module.exports = errorhandler
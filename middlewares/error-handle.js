//handle the error passed by other middleware
//send correct response with status code and message

//history
//Aug 17,2022 - add http-stauts-codes and update



//import customAPIError module
const CustomAPIError = require('../error/customAPIError')
const {StatusCodes} = require('http-status-codes')

const errorhandler = (err, req, res, next) =>{
    //send API error
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({success:false, message:err.message}) 
    }
    //send server error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:`Server error - ${err.message}`})
}

module.exports = errorhandler
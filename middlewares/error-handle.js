//handle the error passed by other middleware
//send correct response with status code and message

//history
//Aug 17,2022 - add http-stauts-codes and update
//Aug 24,2022 - specify errors


//import customAPIError module
const CustomAPIError = require('../error/customAPIError')
const {StatusCodes} = require('http-status-codes')

const errorhandler = (err, req, res, next) =>{

    //template
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong! Try again later'
    }

    //send API error
    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({success:false, message:err.message}) 
    // }

    //Validation Error 
    if(err.name === 'ValidationError'){
        customError.message = Object.values(err.errors)
        .map((item)=>item.message)
        .join(',')
        customError.statusCode = 400
    }

    //cast error
    if(err.name === 'CastError'){
        customError.message = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }


    //check for duplicate value error
    if(err.code && err.code === 11000){
        //override the message
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }


    //send server error
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({ message: customError.message })
}

module.exports = errorhandler
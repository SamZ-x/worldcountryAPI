//history
//Aug 24,2022 - create UnauthenticationError


//import customAPIError
const CustomAPIError = require('./customAPIError')
const {StatusCodes} = require('http-status-codes')

class UnauthenticationError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED    //400
    }
}

module.exports = UnauthenticationError
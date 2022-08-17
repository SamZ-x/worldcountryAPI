//history
//Aug 17,2022 - create BadRequestError


//import customAPIError
const CustomAPIError = require('./customAPIError')
const {StatusCodes} = require('http-status-codes')

class BadRequestError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST    //400
    }
}

module.exports = BadRequestError
//an Error which contains status code and message
//class type

class CustomAPIError extends Error{
    //define constructor with status code and message
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode   //new field call ''
    }
}

//a function to  create customError
const newCustomAPIError = (statusCode, message) =>{
    return new CustomAPIError(statusCode, message)
}

module.exports = {CustomAPIError, newCustomAPIError}
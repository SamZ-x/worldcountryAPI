//history
//Aug 17.2022    - modified CustomAPIError, remove statusCode parameter, and function

//new class of error
class CustomAPIError extends Error{
    //define constructor with status code and message
    constructor(message){
        super(message)
    }
}

//a function to  create customError
// const newCustomAPIError = (statusCode, message) =>{
//     return new CustomAPIError(statusCode, message)
// }

module.exports = CustomAPIError
//a function which wraps the async function with trycatch statement
//argument: a function
//return: an async function promise
//use in controller funcionts

//history:
//Aug 17.2022 - remove from controller, use 'express-async-error' dependency instead


const asyncWrapper = (fn) =>{
    return async(req, res, next)=>{
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)  //pass the error to next middleware
        }
    }
}

module.exports = asyncWrapper
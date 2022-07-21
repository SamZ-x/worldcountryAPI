//a function which wraps the async function with trycatch statement
//argument: a function
//return: an async function promise
//use in controller funcionts

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
//history
//Aug 17,2022 - add http-stauts-codes and update

const {StatusCodes} = require('http-status-codes')
//call back function that handle not found url error
const notFound = (req, res) =>{
    res.status(StatusCodes.NOT_FOUND).send("Page not found!")
}

module.exports = notFound
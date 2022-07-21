//import modules
const mongoose = require('mongoose')

//connection string (use env module)

//set up connection function
const dbConnect = (url) => {
    return mongoose.connect(url)
}

module.exports = dbConnect
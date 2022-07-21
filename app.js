
//****  MODULES & INSTANCES ****//

//import express modules and create server
const express = require('express')
const app = express()

//import routes
const countryRoutes = require('./routes/countryRoutes')

//import database relatived modules
const dbConnect = require('./db/connection')
require('dotenv').config()

//****  Middleware USE ****//
app.use(express.json())

//****  MODULES USE ****//
app.use('/api/v1/worldcountrys', countryRoutes)


//prepare port and run server
const port = 3000

//combine database connect and server start up
const start = async()=>{
    try {
        await dbConnect(process.env.MONGO_WORLDCOUNTRY_URL)    //non-block
        app.listen(port,console.log(`Server is listening port ${port}...`))
    } catch (error) {
        console.log(error.message)
    }
}

start()




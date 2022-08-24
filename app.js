
//************  MODULES & INSTANCES ************//
//import dependencies
require('dotenv').config()
require('express-async-errors')
const helmet = require('helmet')
const xss = require('xss-clean')                     //sanitize user input coming from POST body, GET queries, and url params. 
const ratelimiter = require('express-rate-limit')    //limite access 

//import express modules and create server
const express = require('express')
const app = express()

//import routes
const countryRoutes = require('./routes/countryRoutes')

//import database relatived modules
const dbConnect = require('./db/connection')

//import middleware modules
const notfound = require('./middlewares/url-not-found')
const errorhandler = require('./middlewares/error-handle')
const corsSet = require('./middlewares/cors')


//************  Middlewares USE ************//
app.use(
    ratelimiter({
    windowMs: 15 * 60 * 1000,  //unit:ms   set to 15mins
    max:100,                  //limit each IP to 100 request per windowMs 
  }))
app.use(express.static('./public'))
app.use(express.json())
app.use(helmet())
app.use(xss())

//************  MODULES USE ************//
app.use(corsSet)    //($ npm install cors instead)

app.use('/api/v1/worldcountry', countryRoutes)
app.use(notfound)
app.use(errorhandler)

//prepare port and run server
const port = process.env.port || 3000    

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




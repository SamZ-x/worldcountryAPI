
//****  MODULES & INSTANCES ****//

//import express modules and create server
const express = require('express')
const app = express()

//import routes
const countryRoutes = require('./routes/countryRoutes')

//****  Middleware USE ****//
app.use(express.json())

//****  MODULES USE ****//
app.use('/api/v1/worldcountrys', countryRoutes)

//prepare port and run server
const port = 3000
app.listen(port,console.log(`Server is listening port ${port}...`))






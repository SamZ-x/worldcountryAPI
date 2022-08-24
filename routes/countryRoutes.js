//history
//Aug 24, 2022 - add authentication middleware

//handle different request
//distribute the function to each method.

//import modules
const express = require('express')
const countryController = require('../controllers/countryContr')    //import all the controller functions in countryController variable 
const authentication = require('../middlewares/authentication')

//object instantiation
const router = express.Router()

//routes list
router.route('/').get(countryController.getCountries).post(authentication, countryController.createCountry)
router.route('/:id').get(countryController.getCountryById).patch(authentication, countryController.updateCountry).delete(authentication, countryController.deleteCountry)
router.route('/token').post(countryController.GetAccessToken)

//export router
//serve for app server
module.exports = router
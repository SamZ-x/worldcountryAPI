//handle different request
//distribute the function to each method.

//import modules
const express = require('express')
const countryController = require('../controllers/countryContr')    //import all the controller functions in countryController variable 

//object instantiation
const router = express.Router()

//base url "/api/v1/worldcountrys"
//draft: routes list
// router.get('/', fn)             //get all country
// router.post('/', fn)            //create a country record
// router.get('/:id', fn)          //get a country by id 
// router.get('/region',fn)       //get countries by region 
// router.get('/countinent', fn)  //get countries by countinent 
// router.patch('/:id',fn)         //update country info
// router.delete('/:id',fn)        //delete country record

//routes list
router.route('/').get(countryController.getAllCountries).post(countryController.createCountry)
router.route('/:id').get(countryController.getCountryById).patch(countryController.updateCountry).delete(countryController.deleteCountry)
router.route('/region/:title').get(countryController.getCountriesByRegion)
router.route('/countinent/:title').get(countryController.getCountriesByCountinent)

//export router
//serve for app server
module.exports = router
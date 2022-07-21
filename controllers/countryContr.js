//call back functions for routes

//import modules
const Country = require('../models/country')
const asyncWrapper = require('../middlewares/async')
const {newCustomAPIError} = require('../error/customAPIError')  //import the instantiation function

//get all country
//no req params/query/body
const getAllCountries = asyncWrapper( async (req, res)=>{
    const countries = await Country.find({})
    res.status(202).json({success:true, message: `all countries ${countries.length} record(s)`, data:countries})
})

//create a country
//need req body (contain info data)
const createCountry = asyncWrapper( async (req, res)=>{
    const countryData = req.body
    await Country.create(countryData)
    res.status(202).json({success:true, message: 'create country', data:countryData })
})

//get single country by id
//need req params
const getCountryById = asyncWrapper( async (req, res, next)=>{
    const {id:targetId} = req.params
    const country = await Country.findOne({_id:targetId})    //or findById(targetId)
    //result check
    if(!country){
        //send header and break
       return next(newCustomAPIError(404,`No found country id: ${targetId}`))
    }
    res.status(202).json({success:true, message: `get single country id: ${targetId}`, data:country})
})


//get countries by region
//need req params
const getCountriesByRegion =asyncWrapper( async (req, res, next)=>{
    const {title:regionTitle} = req.params
    const countries = await Country.find({region:regionTitle})     //return empty array if not found
    //result check use return array length
    if(!countries.length){
        return next(newCustomAPIError(404,`No found any country in region ${regionTitle}`))
    }
    res.status(202).json({success:true, message: `get ${countries.length} countries of region: ${regionTitle}`, data:countries})
})


//get countries by countinent 
//need req params
const getCountriesByCountinent =asyncWrapper( async (req, res, next)=>{
    const  {title:countinentTitle}  = req.params
    const countries = await Country.find({countinent:countinentTitle})
    //result check
    if(!countries.length){
        return next(newCustomAPIError(404,`No found any country in countinent ${countinentTitle}`))
    }
    res.status(202).json({success:true, message: `get ${countries.length} countries of countinent: ${countinentTitle}`, data:countries})
})

//update country info
//need req body
const updateCountry =asyncWrapper( async (req, res, next)=>{
    const {id:targetId} = req.params
    const countryData = req.body
    const newCountry = await Country.findByIdAndUpdate({_id:targetId}, countryData, {
        new:true,           //alway get new
        runValidators:true, //alway run verify data
    })
    //if not found existing country, return 404
    if(!newCountry){
        return next(newCustomAPIError(404,`Not found a country with id: ${targetId}`))
    }
    res.status(202).json({success:true, message: "updated country", data:newCountry})
})

//delete country record
//need req params
const deleteCountry =asyncWrapper( async (req, res, next)=>{
    const {id:targetId} = req.params
    const deletedCountry = await Country.findOneAndDelete({_id:targetId})  
    if(!deletedCountry){
        return next(newCustomAPIError(404,`Not found a country with id: ${targetId}`))
    }
    res.status(202).json({success:true, message: `deleted country id : ${targetId}`})
})

//export modules
//serve for routes
module.exports = {
    getAllCountries,
    createCountry,
    getCountryById,
    getCountriesByRegion,
    getCountriesByCountinent,
    updateCountry,
    deleteCountry,
}
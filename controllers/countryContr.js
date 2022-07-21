//call back functions for routes

//import database module
const Country = require('../models/country')

//get all country
//no req params/query/body
const getAllCountries = async (req, res)=>{
    try {
        const countries = await Country.find({})
        res.status(202).json({success:true, message: `all countries ${countries.length} record(s)`, data:countries})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

//create a country
//need req body (contain info data)
const createCountry = async (req, res)=>{
    try {
        const countryData = req.body
        await Country.create(countryData)
        res.status(202).json({success:true, message: 'create country', data:countryData })
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

//get single country by id
//need req params
const getCountryById = async (req, res)=>{
    try {
        const {id:CountryId} = req.params
        const country = await Country.findOne({_id:CountryId})

        //result check
        if(!country)
            return res.status(404).json({success:false, message: `No found country id: ${CountryId}`})

        res.status(202).json({success:true, message: `get single country id: ${CountryId}`, data:country})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}


//get countries by region
//need req params
const getCountriesByRegion = async (req, res)=>{
    try {
        const {title:regionTitle} = req.params
        const countries = await Country.find({region:regionTitle})

        //result check
        if(!countries)
            return res.status(404).json({success:false, message: `No found any country in region ${regionTitle}`})

        res.status(202).json({success:true, message: `get ${countries.length} countries of region: ${regionTitle}`, data:countries})
    } catch (error) {
        res.status(500).json({status:false, message: `something error -  ${error.message}` })
    }
}


//get countries by countinent 
//need req params
const getCountriesByCountinent = async (req, res)=>{
    try {
        const  {title:countinentTitle}  = req.params
        const countries = await Country.find({countinent:countinentTitle})
        //result check
        if(!countries)
            return res.status(404).json({success:false, message: `No found any country in countinent ${countinentTitle}`})
            
        res.status(202).json({success:true, message: `get ${countries.length} countries of countinent: ${countinentTitle}`, data:countries})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

//update country info
//need req body
const updateCountry = (req, res)=>{
    try {
        const country = req.body
        res.status(202).json({success:true, message: "update country", data:country})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

//delete country record
//need req params
const deleteCountry = (req, res)=>{
    try {
        const {id} = req.params
        res.status(202).json({success:true, message: `delete country id : ${id}`, data:null})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

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
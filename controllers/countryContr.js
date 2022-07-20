//call back functions for routes

//get all country
//no req params/query/body
const getAllCountries = (req, res)=>{
    try {
        res.status(202).json({success:true, message: "all countries", data:null})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

//create a country
//need req body (contain info data)
const createCountry = (req, res)=>{
    try {
        const country = req.body
        res.status(202).json({success:true, message: 'create country', data: country })
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}

//get single country by id
//need req params
const getCountryById = (req, res)=>{
    try {
        const {id} = req.params
        res.status(202).json({success:true, message: `get single country id: ${id}`, data:null})
    } catch (error) {
        res.status(500).json({status:false, message: `something error - ${error.message}` })
    }
}


//get countries by region
//need req params
const getCountriesByRegion = (req, res)=>{
    try {
        const {title:regionTitle} = req.params
        res.status(202).json({success:true, message: `get countries of region: ${regionTitle}`, data:null})
    } catch (error) {
        res.status(500).json({status:false, message: `something error -  ${error.message}` })
    }
}


//get countries by countinent 
//need req params
const getCountriesByCountinent = (req, res)=>{
    try {
        const  {title:countinentTitle}  = req.params
        res.status(202).json({success:true, message: `get countries of countinent: ${countinentTitle}`, data:null})
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
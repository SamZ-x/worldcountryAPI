//history
// Aug 17, 2022  - remove asyncWrapper middleware


//import modules
const Country = require('../models/country')
//const asyncWrapper = require('../middlewares/async')
const {newCustomAPIError} = require('../error/customAPIError')  //import the instantiation function
const {BadRequestError} = require('../error')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

//dynamic get countries
//base on filter values
//sort the result
//paging and display
const getCountries = async (req, res)=>{
    //get parameters
    const filter = {}                //store the clean filter data
    const {name, alphaCode, m49Code, region, countinent, sort, fields} = req.query

    //{ <field>: { $regex: /pattern/, $options: '<options>' } }    'i':Case insensitivity
    if(name){
        filter.countryName = {$regex: name, $options: 'i'}     
    }
    if(alphaCode){
        filter.alphaCode =  {$regex: alphaCode, $options: 'i'}
    }
    if(m49Code){
        filter.m49Code =  Number(m49Code)
    }
    if(region){
        filter.region = {$regex: region, $options: 'i'}        
    }
    if(countinent){
        filter.countinent = {$regex: countinent, $options: 'i'}        
    }
    console.log(filter)

    //get the result base on the filters
    let result = Country.find(filter)

    //default sort the result by name,otherwise base on specific request
    //'-' to decending 
    if(sort){
        const sortList = sort.split(',').join(' ')   //re-build the pattern 
        result =result.sort(sortList)
    }
    else{//default sort by countryName ascending
        result = result.sort('countryName')
    }

    //display all fields unless specify
    //'-' to exclude 
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    //set page limit and paging(use skip and limit to implement)
    //skip: skip the records before target
    //limit: not Display the records after the target
    const limit = Number(req.query.limit) || (result.length) //specific limit or all
    const page = Number(req.query.page) || 1    //specific page or default 1st page
    const skipNum = (page-1)*limit
    result = result.skip(skipNum).limit(limit)

    //get back the result
    const countries = await result
    res.status(StatusCodes.OK).json({success:true, message: `Retrieved countries ${countries.length} record(s)`, data:countries})
}


//request token
const GetAccessToken = async (req, res) =>{
    const {key} = req.body;
    const token = jwt.sign({key:key}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
    res.status(StatusCodes.CREATED).json({message:'Token created',token:token})
}

//create a country
//need req body (contain info data)
const createCountry = async (req, res)=>{
    const countryData = req.body
    await Country.create(countryData)
    res.status(StatusCodes.OK).json({success:true, message: 'create country', data:countryData })
}

//get single country by id
//need req params
const getCountryById = async (req, res, next)=>{
    const {id:targetId} = req.params
    const country = await Country.findOne({_id:targetId})    //or findById(targetId)
    //result check
    if(!country){
        //send header and break
       return next(new BadRequestError(`No found country id: ${targetId}`))
    }
    res.status(StatusCodes.OK).json({success:true, message: `get single country id: ${targetId}`, data:country})
}


//update country info
//need req body
const updateCountry =async (req, res, next)=>{
    const {id:targetId} = req.params
    const countryData = req.body
    const newCountry = await Country.findByIdAndUpdate({_id:targetId}, countryData, {
        new:true,           //alway get new
        runValidators:true, //alway run verify data
    })
    //if not found existing country, return 404
    if(!newCountry){
        return next(new BadRequestError(`Not found a country with id: ${targetId}`))
    }
    res.status(StatusCodes.OK).json({success:true, message: "updated country", data:newCountry})
}

//delete country record
//need req params
const deleteCountry =async (req, res, next)=>{
    const {id:targetId} = req.params
    const deletedCountry = await Country.findOneAndDelete({_id:targetId})  
    if(!deletedCountry){
        return next(new BadRequestError(`Not found a country with id: ${targetId}`))
    }
    res.status(StatusCodes.OK).json({success:true, message: `deleted country id : ${targetId}`})
}

//export modules
//serve for routes
module.exports = {
    getCountries,
    getCountryById,
    GetAccessToken,
    createCountry,
    updateCountry,
    deleteCountry,
}
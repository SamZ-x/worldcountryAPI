//import module
const mongoose = require('mongoose')

//create new schema and structure the document
const countrySchema = new mongoose.Schema({
    //fields
    //store country name. ex: Afghanistan
    countryName:{
        type:String,
        required:[true,'must provide a country name'],   //setting with message
        trim:true,
    },

    //store alpha-3-code of a country. ex: AFG (Afghanistan)
    alphaCode:{
        type:String,
        default:"N/A",
        trim:true,
        //unique:true,       //NOT WORK?
    },

    //store M49-code of a country. ex: 24 (Afghanistan)
    m49Code:{
        type:Number,
        default:0,
        //unique:true,
    },

    //store the region of a country. ex: Middle Africa (Afghanistan)
    region:{
        type:String,
        default:"N/A",
        trim:true,
    },

    //store the region of a countinent. ex: Africa (Afghanistan)
    countinent:{
        type:String,
        default:"N/A",
        trim:true,
    },
})

module.exports = mongoose.model('country', countrySchema)
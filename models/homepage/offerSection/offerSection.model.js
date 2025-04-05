const mongoose = require('mongoose');

const offerSectionSchema = new mongoose.Schema({
    image :{
        type : String,
        required : true 
    },
    heading : {
        type : String,
        required : true 
    },
    subHeading : {
        type : String,
    },
}, {timestamps : true});

const OfferSection = mongoose.model("offerSectionSchema", offerSectionSchema);

module.exports = OfferSection;
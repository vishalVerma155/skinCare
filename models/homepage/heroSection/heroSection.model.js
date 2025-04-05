const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
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

const HeroSection = mongoose.model("heroSection", heroSectionSchema);

module.exports = {HeroSection};
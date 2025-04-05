const mongoose = require('mongoose');

const startingAmountSectionSchema = new mongoose.Schema({
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

const StartingAmountSection = mongoose.model("startingAmountSectionSchema", startingAmountSectionSchema);

module.exports = StartingAmountSection;
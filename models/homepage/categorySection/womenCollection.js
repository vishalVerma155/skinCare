const mongoose = require('mongoose');

const womenCollectionSchema = new mongoose.Schema({
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

const WomenCollection = mongoose.model("womenCollection", womenCollectionSchema);

module.exports = WomenCollection;
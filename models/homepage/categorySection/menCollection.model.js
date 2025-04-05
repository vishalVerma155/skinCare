const mongoose = require('mongoose');

const menCollectionSchema = new mongoose.Schema({
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

const MenCollection = mongoose.model("menCollection", menCollectionSchema);

module.exports = MenCollection;
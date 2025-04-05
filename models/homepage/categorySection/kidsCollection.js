const mongoose = require('mongoose');

const kidsCollectionSchema = new mongoose.Schema({
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

const KidsCollection = mongoose.model("kidsCollection", kidsCollectionSchema);

module.exports = KidsCollection;
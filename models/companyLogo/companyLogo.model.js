const mongoose = require('mongoose');

const companyLogoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    publicId : {
        type : String
    }

}, { timestamps: true });

const CompayLogo = mongoose.model('companyLogo', companyLogoSchema);
 module.exports = {CompayLogo};
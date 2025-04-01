const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    city: {
        type: String,

    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pincode: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
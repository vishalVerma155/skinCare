const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Admin =  mongoose.model('Admin', AdminSchema);
module.exports = Admin;

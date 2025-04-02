const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    sparse: true,  //  Good practice
    required: false  //  Explicitly making it optional
  },
  google_id: {
    type: String,
    unique: true,
    sparse: true,  //  Good practice
    required: false  //  Explicitly making it optional
  },
  password: {
    type: String,
    minlength: 6,
    required: false  // Removed sparse (not needed) & made optional
  }
}, { timestamps: true });


// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
// export default User;
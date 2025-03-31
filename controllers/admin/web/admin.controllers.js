const Admin = require('../../../models/userModel/user.model.js');
const {hashPassword, comparePassword} = require("../../../utils/bcrypt.js");
const {generateJWT} = require("../../../utils/jwt.js");

//  Admin Registration
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || username && username.trim() === "" || !password || password && password.trim() === ""){
         return res.status(404).json({ success: false , error : "user name or password not found " });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.find();
        if (existingAdmin.length > 0) return res.status(400).json({ success: false , error : "Admin is already existed." });

        const hashedPassword = await hashPassword(password);
        // Create new admin
        const newAdmin = new Admin({ username, password : hashedPassword });
        await newAdmin.save();

        return res.status(201).json({success: true, message: 'Admin registered successfully', admin : newAdmin});
    } catch (error) {
        res.status(500).json({success: false, error: error.message });
    }
};

//  Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || username && username.trim() === "" || !password || password && password.trim() === ""){
            return res.status(404).json({ success: false , error : "user name or password not found " });
           }
   
        const admin = await Admin.findOne({ username });

        if (!admin) return res.status(404).json({success: false , error: 'Admin not found' });

        // Compare password
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

        const payload = { 
            _id: admin._id, 
            userName: admin.username };
        // Generate JWT Token
        const accessToken = generateJWT(payload);

        // Set cookie (optional)
        res.cookie('AccessToken', accessToken );
        
       return res.json({ success: true, message: 'Login successful',admin, token : accessToken });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Get Admin Profile (Protected)
const getAdminProfile = async (req, res) => {
    try {

        const userId = req.user._id;
        const admin = await Admin.findById(userId).select('-password');
        if (!admin) return res.status(404).json({success: false, error: 'Admin not found' });

        return res.json({ success: true, message: 'Admin successfully fetched', admin });

    } catch (error) {
      return  res.status(500).json({success: false, error : error.message });
    }
};

const changePasswordAdmin = async(req, res) =>{
    try {
        const { currentPassword, newPassword } = req.body; // take details

        if (!currentPassword || currentPassword && currentPassword.trim() === "" || !newPassword || newPassword && newPassword.trim() === "") {
            return res.status(401).json({success: false, error: "Please enter all fields" });
        }
    
        const user = await Admin.findById(req.user._id);
    
    
        // compare password
        const isPasswordCorrect = await comparePassword(currentPassword, user.password);
    
        if (!isPasswordCorrect) {
            return res.status(401).json({success: false, error: "password is not matched" });
        }
    
        const newHashedPassword = await hashPassword(newPassword);
        user.password = newHashedPassword;
        await user.save();
    
        return res.status(200).json({success: true, Message: "Password has been chenged" });
    } catch (error) {
        return res.status(500).json({success: false, error : error.message });  
    }
}

module.exports = { registerAdmin, loginAdmin, getAdminProfile, changePasswordAdmin };

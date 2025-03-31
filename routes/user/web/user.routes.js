const express = require('express');
const {registerUser, loginUser, changeUserPassword, deleteUserProfile, logoutUser, getUserProfile, editUserProfile} = require('../../../controllers/user/web/user.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');


const router = express.Router();

// register user
router.post("/registerUser", registerUser);

// log in user
router.post("/loginUser", loginUser);

//  logout user
router.post("/logoutUser", verifyJWT, logoutUser);

// change user password
router.post("/changeUserPassword", verifyJWT, changeUserPassword);

// delete user profile
router.delete("/deleteUser", verifyJWT, deleteUserProfile);

// get user profile
router.get("/getUserProfile", verifyJWT, getUserProfile);

// update user profile
router.patch("/updateUserProfile", verifyJWT, editUserProfile);



module.exports = router;
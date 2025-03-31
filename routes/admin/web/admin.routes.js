const express = require('express');
const {registerAdmin, loginAdmin, getAdminProfile, changePasswordAdmin} = require('../../../controllers/admin/web/admin.controllers.js');
const {getAllUsers} = require("../../../controllers/user/web/user.controllers.js");
const verifyJWT = require('../../../middleware/auth.middleware.js')

const router = express.Router();

// register admin
router.post("/registerAdmin", registerAdmin );

// login admin
router.post("/loginAdmin", loginAdmin);

// get admin profile
router.get("/getAdmin", verifyJWT, getAdminProfile);

// change admin password
router.patch("/changePasswordAdmin", verifyJWT, changePasswordAdmin);

router.get("/getAllRegisterUser", verifyJWT, getAllUsers);


module.exports = router;
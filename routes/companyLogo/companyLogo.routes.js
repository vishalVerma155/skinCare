const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const {upload} = require('../../utils/multer.js');
const {registerCompanyLogo, getAllCompanyLogo,getCompanyLogo,updateCompanyLogo, deleteCompanyLogo} = require('../../controllers/companyLogo/companyLogo.controllers.js')

const router = express.Router();

// register company logo
router.post("/registerCompanyLogo", verifyJWT, upload.single('companyLogo'),registerCompanyLogo);

// get company logo
router.get("/getCompanyLogo/:logoId",getCompanyLogo);

// get all register company logo
router.get("/getAllCompanyLogo",  getAllCompanyLogo);

// update company logo
router.post("/updateCompanyLogo/:logoId", verifyJWT, upload.single("companyLogo"), updateCompanyLogo);

// delete company logo
router.delete("/deleteCompanyLogo/:logoId", verifyJWT, deleteCompanyLogo);

module.exports = router;
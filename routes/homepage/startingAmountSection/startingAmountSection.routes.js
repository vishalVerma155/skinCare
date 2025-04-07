const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const { upload } = require('../../../utils/multer.js');
const {registerStartingAmountSection, getAllStartingAmountSection,getStartingAmountSection,updateStartingAmountSection, deleteStartingAmountSection } = require('../../../controllers/homapage/startingAmountSection/startingAmountSection.controllers.js')


const router = express.Router();

// register hero section
router.post("/registerStartingAmountSection", verifyJWT, upload.single("startingAmountSectionImage"), registerStartingAmountSection);

// update hero section
router.post("/updateStartingAmountSection/:sectionId", verifyJWT,upload.single("startingAmountSectionImage"), updateStartingAmountSection);

// get hero section
router.get("/getStartingAmountSection/:sectionId", getStartingAmountSection);

// get all hero section images
router.get("/getAllStartingAmountSectionImages", getAllStartingAmountSection);

// delete hero section image
router.delete("/deleteStartingAmountSection/:sectionId", verifyJWT, deleteStartingAmountSection);

module.exports = router;
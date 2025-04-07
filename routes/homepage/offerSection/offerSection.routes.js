const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const { upload } = require('../../../utils/multer.js');
const {registerOfferSection, getAllOfferSection,getOfferSection,updateOfferSection, deleteOfferSection} = require('../../../controllers/homapage/offerSection/offerSection.controllers.js')


const router = express.Router();

// register hero section
router.post("/registerOfferSection", verifyJWT, upload.single("offerSectionImage"), registerOfferSection);

// update hero section
router.post("/updateOfferSection/:sectionId", verifyJWT,upload.single("offerSectionImage"), updateOfferSection);

// get hero section
router.get("/getOfferSection/:sectionId", getOfferSection);

// get all hero section images
router.get("/getAllOfferSectionImages", getAllOfferSection);

// delete hero section image
router.delete("/deleteOfferSection/:sectionId", verifyJWT, deleteOfferSection);

module.exports = router;
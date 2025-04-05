const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const { upload } = require('../../../utils/multer.js');
const {registerHeroSection, getAllHeroSection, getHeroSection, updateHeroSection, deleteHeroSection} = require('../../../controllers/homapage/heroSection/heroSection.controllers.js')


const router = express.Router();

// register hero section
router.post("/registerHeroSection", verifyJWT, upload.single("heroSectionImage"), registerHeroSection);

// update hero section
router.post("/updateHeroSection/:sectionId", verifyJWT,upload.single("heroSectionImage"), updateHeroSection);

// get hero section
router.get("/getHeroSection/:sectionId", getHeroSection);

// get all hero section images
router.get("/getAllHeroSectionImages", getAllHeroSection);

// delete hero section image
router.delete("/deleteHeroSection/:sectionId", verifyJWT, deleteHeroSection);

module.exports = router;
const express = require('express');
const {upload} = require('../../../utils/multer.js');
const {registerBrandsSection, getAllBrandsSection,getBrandsSection, updateBrandsSection, updateImageBrandsSection, deleteBrandsSection} = require('../../../controllers/homapage/brands/brands.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const router = express.Router();

// register brand section
router.post("/registerBrandSection", verifyJWT, upload.single("brandSectionImage"), registerBrandsSection);

// update image in brand section
router.post("/updateImageBrandSection/:sectionId/:imageId", verifyJWT, upload.single("brandSectionImage"), updateImageBrandsSection);

// update brand section
router.post("/updateBrandSection/:sectionId", verifyJWT, upload.array("brandSectionImages", 6), updateBrandsSection);

// get all brand sections
router.get("/getAllBrandSection",  getAllBrandsSection);

// get particular sale section
router.get("/getBrandSection/:sectionId", getBrandsSection);

// delete sale section
router.delete("/deleteBrandSection/:sectionId", verifyJWT, deleteBrandsSection );

module.exports = router;
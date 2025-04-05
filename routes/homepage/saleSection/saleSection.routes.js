const express = require('express');
const {upload} = require('../../../utils/multer.js');
const {registerSaleSection, updateImageSaleSection,  getsaleSection, getAllSaleSection, deleteSaleSection} = require('../../../controllers/homapage/saleSection/saleSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const router = express.Router();

// register sale section
router.post("/registerSaleSection", verifyJWT, upload.fields([{name : "saleImage1", maxCount : 1}, {name : "saleImage2", maxCount : 1}, {name : "saleImage3", maxCount : 1}]), registerSaleSection);

// update image in sale section
router.patch("/updateImageSaleSection/:sectionId", verifyJWT, upload.fields([{name : "saleImage1", maxCount : 1}, {name : "saleImage2", maxCount : 1}, {name : "saleImage3", maxCount : 1}]), updateImageSaleSection);


// get all sale sections
router.get("/getAllSaleSection",  getAllSaleSection);

// get particular sale section
router.get("/getSaleSection/:sectionId",  getsaleSection);

// delete sale section
router.delete("/deletesaleSection/:sectionId", verifyJWT, deleteSaleSection );

// delete image on clodaniry

module.exports = router;

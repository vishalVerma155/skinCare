const express = require('express');
const {upload} = require('../../../utils/multer.js');
const {registerNewArrivalSection, updateImageNewArrivalSection, getAllNewArrivalSection, getNewArrivalSection, deleteNewArrivalSection} = require('../../../controllers/homapage/newArrivalsection/newArrivalSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const router = express.Router();

// register newArrival section
router.post("/registerNewArrivalSection", verifyJWT, upload.fields([{name : "newArrivalImage1", maxCount : 1}, {name : "newArrivalImage2", maxCount : 1}]), registerNewArrivalSection);

// update image in NewArrival section
router.patch("/updateImageNewArrivalSection/:sectionId", verifyJWT,  upload.fields([{name : "newArrivalImage1", maxCount : 1}, {name : "newArrivalImage2", maxCount : 1}]), updateImageNewArrivalSection);


// get all NewArrival sections
router.get("/getAllNewArrivalSection",  getAllNewArrivalSection);

// get particular NewArrival section
router.get("/getNewArrivalSection/:sectionId",  getNewArrivalSection);

// delete NewArrival section
router.delete("/deleteNewArrivalSection/:sectionId", verifyJWT, deleteNewArrivalSection );

module.exports = router;
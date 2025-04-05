const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const {upload} = require('../../../utils/multer.js')
const { registerMenCollection, getAllMenCollection,getMenCollection,updateMenCollection, deleteMenCollection } = require('../../../controllers/homapage/categorySection/menCollection.controllers.js');


const router = express.Router();

// register men collection
router.post("/registerMenCollection", verifyJWT, upload.single("menCollectionImage"), registerMenCollection);

// get all men collection
router.get("/getAllMenCollection", getAllMenCollection);

// get men collection
router.get("/getMenCollection/:sectionId", getMenCollection);

// update men collection
router.patch("/updateMenCollection/:sectionId", verifyJWT,upload.single("menCollectionImage"), updateMenCollection);

// delete men collection
router.delete("/deleteMenCollection/:sectionId", verifyJWT, deleteMenCollection);



module.exports = router;
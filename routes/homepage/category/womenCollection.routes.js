const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const {upload} = require('../../../utils/multer.js')
const { registerWomenCollection, getAllWomenCollection,getWomenCollection,updateWomenCollection, deleteWomenCollection } = require('../../../controllers/homapage/categorySection/womenCollection.controllers.js');


const router = express.Router();

// register men collection
router.post("/registerWomenCollection", verifyJWT, upload.single("womenCollectionImage"), registerWomenCollection);

// get all men collection
router.get("/getAllWomenCollection", getAllWomenCollection);

// get men collection
router.get("/getWomenCollection/:sectionId", getWomenCollection);

// update men collection
router.patch("/updateWomenCollection/:sectionId", verifyJWT, upload.single("womenCollectionImage"), updateWomenCollection);

// delete men collection
router.delete("/deleteWomenCollection/:sectionId", verifyJWT, deleteWomenCollection);



module.exports = router;
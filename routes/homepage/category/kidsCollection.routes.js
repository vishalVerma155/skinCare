const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const {upload} = require('../../../utils/multer.js')
const { registerKidsCollection, getAllKidsCollection,getKidsCollection,updateKidsCollection, deleteKidsCollection } = require('../../../controllers/homapage/categorySection/kidsCollection.controllers.js');


const router = express.Router();

// register men collection
router.post("/registerKidsCollection", verifyJWT, upload.single("kidsCollectionImage"), registerKidsCollection);

// get all men collection
router.get("/getAllKidsCollection", getAllKidsCollection);

// get men collection
router.get("/getKidsCollection/:sectionId", getKidsCollection);

// update men collection
router.patch("/updateKidsCollection/:sectionId", verifyJWT, upload.single("kidsCollectionImage"), updateKidsCollection);

// delete men collection
router.delete("/deleteKidsCollection/:sectionId", verifyJWT, deleteKidsCollection);



module.exports = router;
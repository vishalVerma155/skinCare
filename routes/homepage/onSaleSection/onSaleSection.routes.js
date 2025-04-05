const express = require('express');
const {createOnSaleSection} = require('../../../controllers/homapage/onSaleSection/onSaleSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
// const { upload } = require('../../../utils/multer.js');
const router = express.Router();

// register On sale section
router.get("/getOnSaleSection", createOnSaleSection);


module.exports = router;
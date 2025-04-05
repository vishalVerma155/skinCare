const express = require('express');
const {createTopRatedSection} = require('../../../controllers/homapage/topRatedSection/topRatedSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const router = express.Router();

// create top rated section
router.get("/getTopRatedSection", createTopRatedSection);


module.exports = router;
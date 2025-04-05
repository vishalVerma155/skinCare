const express = require('express');
const {createRecentArrivalSection} = require('../../../controllers/homapage/recentArrivalSection/recentArrivalSection.controllers.js');
const router = express.Router();

// register recent arrival section
router.get("/getRecentArrivalSection", createRecentArrivalSection);


module.exports = router;
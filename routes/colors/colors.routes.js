const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const {createColors, getAllColors, addColors} = require('../../controllers/colors/colors.controllers.js')

const router = express.Router();

// register company logo
router.post("/createColorsArray", verifyJWT, createColors);

router.get("/getAllregisteredColors", getAllColors);

router.patch("/addColors", verifyJWT, addColors);



module.exports = router;
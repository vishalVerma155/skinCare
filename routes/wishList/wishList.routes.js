const {addProductInWishList, getWishList, removeProductFromWishlist} = require('../../controllers/wishList/wishList.controllers.js');
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');

const router = express.Router();

// add product in wish list
router.post("/addProductInWishList/:productId", verifyJWT, addProductInWishList);

// get wish list
router.get("/getWishList", verifyJWT, getWishList);

// remove product from wish list
router.put("/removeProductFromWishlist/:productId", verifyJWT, removeProductFromWishlist);

module.exports = router;
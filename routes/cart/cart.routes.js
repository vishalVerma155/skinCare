const {addProductInCart, getCart, removeProductFromCart} = require('../../controllers/cart/cart.controllers.js');
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');

const router = express.Router();

// add product in wish list
router.post("/addProductInCart/:productId", verifyJWT, addProductInCart);

// get cart
router.get("/getCart", verifyJWT, getCart);

// // remove product cart
router.put("/removeProductFromCart/:productId", verifyJWT, removeProductFromCart);

module.exports = router;
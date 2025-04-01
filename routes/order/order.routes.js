const {createOrder, getAllOrdersByUser, getAllOrdersForAdmin,  updateOrder, getOrderById} = require('../../controllers/order/order.controllers.js');
const {createAddress, getAddressById, getAllAddressesByUser, deleteAddress, updateAddress} = require("../../controllers/order/address.controllers.js");
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const router = express.Router();


// create product
router.post("/createAddress", verifyJWT, createAddress);

// update address 
router.patch("/updateAddress/:addressId", verifyJWT, updateAddress);

// get addresses of loged in user
router.get("/getAllAddressesUser", verifyJWT, getAllAddressesByUser);

// get address by id
router.get("/getAddressById/:addressId", verifyJWT, getAddressById);

// delete address
router.delete("/deleteAddress/:addressId", verifyJWT, deleteAddress);


// create order
router.post("/createOrder", verifyJWT, createOrder);

// get all orders by user
router.get("/getOrderbyUser", verifyJWT, getAllOrdersByUser);

// get all orders for admin
router.get("/getAllOrdersForAdmin", verifyJWT, getAllOrdersForAdmin);

// get order by id
router.get("/getOrderById/:orderId", verifyJWT, getOrderById );

// update order
router.patch("/updateOrder/:orderId", verifyJWT, updateOrder);





module.exports = router;
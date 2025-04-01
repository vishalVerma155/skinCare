const {createProduct, updateProduct, getAllProducts, getProduct,getProductCount, deleteProduct, applyFilterOnProducts} = require('../../controllers/product/product.controllers.js');
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const { upload } = require('../../utils/multer.js');
const router = express.Router();
const {getAllRegisterCategories, getAllRegisterBrands} = require("../../controllers/product/categorie.controllers.js");

// create product
router.post("/createProduct", verifyJWT,upload.fields([{name : "mainImage", maxCount : 1},{name : "subImages", maxCount : 4} ]), createProduct);

// update product
router.put("/updateProduct/:productId", verifyJWT, upload.fields([{name : "mainImage", maxCount : 1},{name : "subImages", maxCount : 4} ]), updateProduct );

// get all product
router.get("/getAllProduct",  getAllProducts);

// get product by id
router.get("/getProduct/:productId",  getProduct);

// delete product
router.delete("/deleteProduct/:productId", verifyJWT, deleteProduct);

// apply filter on price 
router.post("/getFilteredProducts",  applyFilterOnProducts);


// PRODUCT CATEGORY
router.get("/getAllRegisterCategory",  getAllRegisterCategories);

// get all register bfrands
router.get("/getAllRegisterBrands",  getAllRegisterBrands);

router.get("/getProductCount",verifyJWT, getProductCount);


module.exports = router;
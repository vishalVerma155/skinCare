const Product = require("../../models/productModel/product.model.js");
// const User = require("../../models/userModel/user.model");

const getAllRegisterCategories = async(req, res) =>{
    try {
        const categoreis =  await Product.distinct("productCategory");
        return res.status(200).json({success : true, all_categories : categoreis });

    } catch (error) {
        return res.status(500).json({success : false, error: error.message });
    }
}

const getAllRegisterBrands = async(req, res) =>{
    try {
        const categoreis =  await Product.distinct("brand");
        return res.status(200).json({success : true, all_Brands : categoreis });

    } catch (error) {
        return res.status(500).json({success : false, error: error.message });
    }
}

module.exports = {getAllRegisterCategories, getAllRegisterBrands}
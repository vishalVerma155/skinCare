const Product = require('../../../models/productModel/product.model.js')


// create recent arrival section
const createRecentArrivalSection = async(req, res) =>{
    try {
        const {productCategory, gender} = req.body;

        if(!productCategory || productCategory && productCategory.trim() === ""){
            return res.status(404).json({success : false, error : "Blank fields is not allowed"});
        }

        if(!gender || gender && gender.trim() === ""){
            return res.status(404).json({success : false, error : "Blank fields is not allowed"});
        }
        const upload = {};
        if(productCategory){
            upload.productCategory = productCategory;
        }

        if(gender){
            upload.gender = gender;
        }

        const recentArrivalSection = await Product.find({...upload}).sort({createdAt : -1});
        return res.status(200).json({success : true, Message: "Recent arrival Section has been created", recentArrivalSection });
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

module.exports = { createRecentArrivalSection};

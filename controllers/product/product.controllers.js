const Product = require('../../models/productModel/product.model.js');

const createProduct = async (req, res) => {
    try {

        const body = req.body; // get product details
        const mainImage = req.files?.mainImage?.[0]?.path; // get main image 
        const subImages = req.files?.subImages ? req.files.subImages.map((file) => file.path) : undefined; // get subimages

        if (!mainImage || !body.productName || !body.productCategory || body.price < 1) {
            return res.status(400).json({success : false, error: "Main image, Product name, category, and price are mandetory" }); // check validation
        }

        const product = new Product({
            ...body,
            mainImage,
            subImages
        })

        await product.save(); // save product

        if (!product) {
            return res.status(500).json({success : false, error: "Product not saved. something went wrong on server side" }); // check section is saved or not
        }

        return res.status(200).json({success : true, Message: "Product has been created", product });
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// update product
const updateProduct = async (req, res) => {
    try {
        const body = req.body; // get body data
        const productId = req.params.productId; // get section id
        const mainImage = req.files?.mainImage?.[0]?.path || undefined; // get main image
        const subImages = req.files.subImages ? req.files.subImages.map((file) => file.path) : undefined; // get sub images


        const updateData = {
            ...body,
            ...(mainImage && { mainImage }),
            ...(subImages && { subImages })
        };

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true }); // find and update section

        if (!updatedProduct) {
            return res.status(404).json({success : false, error: "Wrong product id. Product not found" });
        }

        return res.status(200).json({success : true, Message: "Product has been updated", updated_Product: updatedProduct }); // return response

    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get all products
const getAllProducts = async (req, res) => {
    try {
        const list = await Product.find(); // get all list 
        return res.status(200).json({success : true, all_Products: list });
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// get particular product
const getProduct = async (req, res) => {
    try {
        const productId = req.params.productId; // get product id
        if (!productId) {
            return res.status(404).json({ success : false, error: "Product id not found" });
        }

        const product = await Product.findById(productId); // find product
        if (!product) {
            return res.status(404).json({ success : false, error: "Product not found. Wrong product id" });
        }

        return res.status(200).json({ success : true, status: "Successful", product })
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// delete product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId; // get productId
        if (!productId) {
            return res.status(404).json({success : false, error: "product Id not found" });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId); // get product and delete
        if (!deletedProduct) {
            return res.status(404).json({success : false, error: "Product not found. Wrong product id" });
        }

        return res.status(200).json({ success : true, deletedProduct });
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// apply filters on products
const applyFilterOnProducts = async (req, res) => {
    try {
        const { productCategory, size, colour, brand, minPrice, maxPrice, minRating, minDiscount, onSale, gender } = req.body; // get filter sections


        const filter = {};

        if (productCategory) {
            filter.productCategory = { $in: productCategory.toString().split(',') };
        }

        if (size) {
            filter.size = { $in: size.toString().split(',') };  // match the size in array
        }

        if (colour) {
            filter.colour = { $in: colour.toString().split(',') }; // match colours in the array 
        }

        if(onSale){
            filter.onSale = onSale;
        }

        if(gender){
            filter.gender = gender;
        }

        if (brand) {
            filter.brand = { $in: brand.toString().split(',') }; // match brand in the array 
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice); // compare max price
            }

            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice); // compare min price
            }
        }

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) }; // compare rating
        }


        if (minDiscount) {
            filter.discount = { $gte: parseFloat(minDiscount) }; // compare discount
        }


        const products = await Product.find({ ...filter }); // serach products with filter

        return res.status(200).json({success : true, Message: "Filtered products have been fetched", products }); // return response  
    } catch (error) {
        return res.status(400).json({success : false, error: error.message }); // return error if existed
    }
}

const getProductCount = async(req, res) =>{
    try {
        const productCount = await Product.countDocuments();

        return res.status(200).json({success : true,  productCount }); // return response  
    } catch (error) {
        
    }
}

module.exports = { createProduct, updateProduct, getAllProducts, getProduct, deleteProduct, applyFilterOnProducts, getProductCount };
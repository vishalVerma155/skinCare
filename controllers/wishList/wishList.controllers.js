const WishList = require('../../models/wishList/wishList.model.js');
const Product = require("../../models/productModel/product.model.js")

const addProductInWishList = async (req, res) => {
    try {
        const userId = req.user._id; // get user id
        const productId = req.params.productId; // get product id

        if (!productId) {
            return res.status(404).json({success : false, error: "Product id not found" });
        }

        let wishList = await WishList.findOne({ userId }); // check wishlist is existed or not

        if (!wishList) {
            wishList = new WishList({
                userId,
                products: [productId],
            })   // if wish list is not existed then add user id and product id in this
        } else {
            if (!wishList.products.includes(productId)) {
                wishList.products.push(productId); // if wish is existed then add product it in this
            }
        }

        await wishList.save(); // save the wish list

        if (!wishList) {
            return res.status(400).json({success : false, error: "Wish list is not updated." })
        }

        return res.status(200).json({success : true, Message: "Wish list has been updated", wishList }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get wishlist
const getWishList = async (req, res) => {
    try {
        const userId = req.user._id; // get user id
        const wishlist = await WishList.findOne({ userId }).populate({
            path: "products",
            select: "productName mainImage productCategory price stock", // ✅ Pop;
        })

        if (!wishlist) {
            return res.status(400).json({success : false, error: "Wish list is not existed" });
        }

        return res.status(200).json({ success : true, wishlist });
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// remove product from wish list
const removeProductFromWishlist = async (req, res) => {
    try {

        const user = req.user._id;
        const productId = req.params.productId;

        if (!user || !productId) {
            return res.status(404).json({success : false, error: "product id or user id not found" })
        }

        const wishlist = await WishList.findOneAndUpdate(
            { userId: user },              // Find the wishlist for the user
            { $pull: { products: productId } }, // Remove the product from the products array
            { new: true }                  // Return the updated wishlist
        );

        if (!wishlist) {
            return res.status(404).json({success : false, error: ' wishlist not found' });
        }

        return res.status(200).json({success : true, message: 'Product has been removed from wishlist', wishlist });
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
};


module.exports = { addProductInWishList, getWishList, removeProductFromWishlist };
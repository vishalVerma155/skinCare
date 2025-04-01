const Cart = require('../../models/cart/cart.model.js');
const Product = require("../../models/productModel/product.model.js")

const addProductInCart = async (req, res) => {
    try {
        const userId = req.user._id;  // Get user ID
        const productId = req.params.productId;  // Get product ID
        const { color, size, quantity } = req.body;  // Get color, size, and quantity

        // Validate input
        if (!productId || !color || !size || !quantity || quantity <= 0) {
            return res.status(400).json({success : false, error: "Product ID, color, size, and valid quantity are required." });
        }

        const isProduuctAviable = await Product.findById(productId);

        if(!isProduuctAviable || isProduuctAviable.stock === false){
            return res.status(400).json({success : false, error: "This product is not available" });
        }
        

        let cart = await Cart.findOne({ userId }); // Check if cart exists

        if (!cart) {
            // Create new cart if not exist
            cart = new Cart({
                userId,
                products: [{ product: productId, quantity, color, size }],
            });
        } else {
            // Check if the same product with the same color and size exists
            const existedProduct = cart.products.find(
                (p) => 
                    p.product.toString() === productId &&
                    p.color === color &&
                    p.size === size
            );

            if (existedProduct) {
                existedProduct.quantity += quantity;  // Increase quantity based on request
            } else {
                cart.products.push({ product: productId, quantity, color, size }); // Add new product variation
            }
        }

        await cart.save(); // Save the cart

        return res.status(200).json({success : true, Message: "Cart has been updated", cart });
    } catch (error) {
        return res.status(500).json({success : false, error: error.message });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID
        const cart = await Cart.findOne({ userId }).populate({
            path: "products.product", // Populate the product field inside products array
            model: "Product", // Explicitly specify the model
            select: "productName mainImage price"
        });;

        return res.status(200).json({success : true, cart : cart ? cart : "Cart is empty" });
    } catch (error) {
        return res.status(500).json({success : false, error: error.message });
    }
};


const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user._id;  // Get user ID
        const productId = req.params.productId;  // Get product ID
        const { color, size, quantity } = req.body;  // Get color, size, and quantity from request

        // Validate input
        if (!userId || !productId || !color || !size || !quantity || quantity <= 0) {
            return res.status(400).json({ success: false, error: "User ID, product ID, color, size, and valid quantity are required." });
        }

        const cart = await Cart.findOne({ userId });  // Find the cart

        if (!cart) {
            return res.status(404).json({ success: false, error: "Cart not found." });
        }

        // Find index of the product with the same color and size
        const index = cart.products.findIndex(
            (p) => p.product.toString() === productId && p.color === color && p.size === size
        );

        if (index === -1) {
            return res.status(404).json({ success: false, error: "Product not found in the cart." });
        }

        if (cart.products[index].quantity > quantity) {
            cart.products[index].quantity -= quantity;  // Reduce quantity
        } else {
            cart.products.splice(index, 1);  // Remove product if quantity to remove is equal or greater
        }

        await cart.save();  // Save updated cart

        return res.status(200).json({ success: true, message: "Cart has been updated.", cart });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



module.exports = { addProductInCart, getCart, removeProductFromCart };

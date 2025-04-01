const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            price: Number,
            color: String,
            size: String
        },
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    billingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    shippingCost: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    paymentMethod: {
        type: String,
        default: "cod"
    },
    transtionId: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;

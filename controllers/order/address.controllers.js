const Address = require('../../models/order/address.model.js');
const User = require("../../models/userModel/user.model.js")

const createAddress = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(404).json({ success: false, error: "User is not loged in. Please login first" })
        }

        const { firstName, streetAddress, city, state, country, pincode, phone } = req.body;
        const data = req.body;

        if (!firstName || !streetAddress || !city || !state || !country || !pincode || !phone) {
            return res.status(404).json({ success: false, error: "First Name Street Address City State Country Pincode Phone are compulsary" })
        }

        const address = new Address({
            ...data,
            userId
        });
        await address.save();

        return res.status(200).json({ success: true, Message: "Address has been saved", address })
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

const getAllAddressesByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ success: false, error: "User is not loged in. Please login first" })
        }
        const addresses = await Address.find({ userId }).populate("userId", "name userName");
        return res.json({ success: true, addresses });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getAddressById = async (req, res) => {
    try {
        const addessId = req.params.addressId;
        const address = await Address.findById(addessId);
        if (!address) {
            return res.json({ success: false, error: "Address not found." });
        }
        return res.json({ success: true, address });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const updateAddress = async (req, res) => {
    try {
        const addressId = req.params.addressId;
        const data = req.body;

        const address = await Address.findByIdAndUpdate(addressId, data, { new: true });

        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        return res.json({ success: true, message: "Address updated successfully", updated_address: address });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};


const deleteAddress = async (req, res) => {
    try {
        const addessId = req.params.addressId;
        const address = await Address.findByIdAndDelete(addessId);
        if (!address) {
            return res.json({ success: false, error: "Address not found." });
        }
        return res.json({ success: true, deleted_address: address });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


module.exports = { createAddress, getAddressById, getAllAddressesByUser, updateAddress, deleteAddress };
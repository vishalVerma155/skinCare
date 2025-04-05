const WomenCollection = require('../../../models/homepage/categorySection/womenCollection.js');

// register hero section image
const registerWomenCollection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        const {heading, subHeading} = req.body;

        if (!image || heading) {
            return res.status(404).json({success : false, error: "Image and heading are compulsary" });
        }

        const createdWomenCollection= new WomenCollection({
            image,
            heading,
            subHeading
        });
        await createdWomenCollection.save(); //  save logo

        if (!createdWomenCollection) {
            return res.status(500).json({success : false, error: "Error in create women collection section in database" }); // check if logo is saved or not
        }

        return res.status(200).json({success : true,  Message: "women collection section sucessfully created", WomenCollectionSection :createdWomenCollection }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get all hero section image
const getWomenCollection = async (req, res) => {
    try {
        const imageId = req.params.sectionId; // get image id

        if (!imageId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await WomenCollection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ success : false, error: "women collection section not found" }); // check image id 
        }

        return res.status(200).json({success : true, WomenCollection_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// get all hero section
const getAllWomenCollection = async (req, res) => {
    try {
        const images = await WomenCollection.find(); // find all images
        return res.status(200).json({success : true, All_WomenCollection: images }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// update hero section
const updateWomenCollection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get image id
        const newImage = req.file ? req.file.path : undefined;
        const{heading, subHeading} = req.body;

        if (!sectionId) {
            return res.status(404).json({ success : false, error: "Section id not found" }); // check image id 
        }

        const payload = {};

        if(heading){
            payload.heading = heading;
        }

        
        if(subHeading){
            payload.subHeading = subHeading;
        }

        
        if(newImage){
            payload.image = newImage;
        }

        const womenCollection = await WomenCollection.findByIdAndUpdate(imageId, payload, { new: true }); // find hero section image and update 
        if (!womenCollection) {
            return res.status(404).json({ success : false, error: " Section not found" }); // check image id 
        }

        return res.status(200).json({success : true, update_WomenCollection_Section: womenCollection }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// delete hero section 

const deleteWomenCollection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get image id

        if (!sectionId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await WomenCollection.findByIdAndDelete(sectionId); // find image and delete
        if (!image) {
            return res.status(404).json({ success : false, error: " section not found" }); // check image id 
        }

        return res.status(200).json({success : true, Message: "women collection section has been deleted", deleted_WomenCollection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

module.exports = {registerWomenCollection, getAllWomenCollection,getWomenCollection,updateWomenCollection, deleteWomenCollection};
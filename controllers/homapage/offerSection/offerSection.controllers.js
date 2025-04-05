const OfferSection = require('../../../models/homepage/offerSection/offerSection.model.js');

// register hero section image
const registerOfferSection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        const {heading, subHeading} = req.body;

        if (!image || heading) {
            return res.status(404).json({success : false, error: "Image and heading are compulsary" });
        }

        const createdOfferSection= new OfferSection({
            image,
            heading,
            subHeading
        });
        await createdOfferSection.save(); //  save logo

        if (!createdOfferSection) {
            return res.status(500).json({success : false, error: "Error in create offer section in database" }); // check if logo is saved or not
        }

        return res.status(200).json({success : true,  Message: "Offer section sucessfully created", OfferSectionSection :createdOfferSection }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get all hero section image
const getOfferSection = async (req, res) => {
    try {
        const imageId = req.params.sectionId; // get image id

        if (!imageId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await OfferSection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ success : false, error: "Offer section not found" }); // check image id 
        }

        return res.status(200).json({success : true, OfferSection_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// get all hero section
const getAllOfferSection = async (req, res) => {
    try {
        const images = await OfferSection.find(); // find all images
        return res.status(200).json({success : true, All_OfferSection: images }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// update hero section
const updateOfferSection = async (req, res) => {
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

        const offerSection = await OfferSection.findByIdAndUpdate(imageId, payload, { new: true }); // find hero section image and update 
        if (!offerSection) {
            return res.status(404).json({ success : false, error: " Section not found" }); // check image id 
        }

        return res.status(200).json({success : true, update_OfferSection_Section: offerSection }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// delete hero section 

const deleteOfferSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get image id

        if (!sectionId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await OfferSection.findByIdAndDelete(sectionId); // find image and delete
        if (!image) {
            return res.status(404).json({ success : false, error: " section not found" }); // check image id 
        }

        return res.status(200).json({success : true, Message: "Offer section has been deleted", deleted_OfferSection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

module.exports = {registerOfferSection, getAllOfferSection,getOfferSection,updateOfferSection, deleteOfferSection};
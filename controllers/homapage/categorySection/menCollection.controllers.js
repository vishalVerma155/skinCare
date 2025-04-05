const MenCollection = require('../../../models/homepage/categorySection/menCollection.model.js');

// register hero section image
const registerMenCollection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        const {heading, subHeading} = req.body;

        if (!image || heading) {
            return res.status(404).json({success : false, error: "Image and heading are compulsary" });
        }

        const createdMenCollection= new MenCollection({
            image,
            heading,
            subHeading
        });
        await createdMenCollection.save(); //  save logo

        if (!createdMenCollection) {
            return res.status(500).json({success : false, error: "Error in create men collection section in database" }); // check if logo is saved or not
        }

        return res.status(200).json({success : true,  Message: "Men collection section sucessfully created", menCollectionSection :createdMenCollection }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get all hero section image
const getMenCollection = async (req, res) => {
    try {
        const imageId = req.params.sectionId; // get image id

        if (!imageId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await MenCollection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ success : false, error: "Men collection section not found" }); // check image id 
        }

        return res.status(200).json({success : true, menCollection_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// get all hero section
const getAllMenCollection = async (req, res) => {
    try {
        const images = await MenCollection.find(); // find all images
        return res.status(200).json({success : true, All_MenCollection: images }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// update hero section
const updateMenCollection = async (req, res) => {
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

        const menCollection = await MenCollection.findByIdAndUpdate(imageId, payload, { new: true }); // find hero section image and update 
        if (!menCollection) {
            return res.status(404).json({ success : false, error: " Section not found" }); // check image id 
        }

        return res.status(200).json({success : true, update_MenCollection_Section: menCollection }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// delete hero section 

const deleteMenCollection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get image id

        if (!sectionId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await MenCollection.findByIdAndDelete(sectionId); // find image and delete
        if (!image) {
            return res.status(404).json({ success : false, error: " section not found" }); // check image id 
        }

        return res.status(200).json({success : true, Message: "Men collection section has been deleted", deleted_MenCollection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

module.exports = {registerMenCollection, getAllMenCollection,getMenCollection,updateMenCollection, deleteMenCollection};
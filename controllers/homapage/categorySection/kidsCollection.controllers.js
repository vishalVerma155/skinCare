const KidsCollection = require('../../../models/homepage/categorySection/kidsCollection.js');

// register hero section image
const registerKidsCollection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        const {heading, subHeading} = req.body;

        if (!image || heading) {
            return res.status(404).json({success : false, error: "Image and heading are compulsary" });
        }

        const createdKidsCollection= new KidsCollection({
            image,
            heading,
            subHeading
        });
        await createdKidsCollection.save(); //  save logo

        if (!createdKidsCollection) {
            return res.status(500).json({success : false, error: "Error in create women collection section in database" }); // check if logo is saved or not
        }

        return res.status(200).json({success : true,  Message: "kids collection section sucessfully created", KidsCollectionSection :createdKidsCollection }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get all hero section image
const getKidsCollection = async (req, res) => {
    try {
        const imageId = req.params.sectionId; // get image id

        if (!imageId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await KidsCollection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ success : false, error: "kids collection section not found" }); // check image id 
        }

        return res.status(200).json({success : true, KidsCollection_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// get all hero section
const getAllKidsCollection = async (req, res) => {
    try {
        const images = await KidsCollection.find(); // find all images
        return res.status(200).json({success : true, All_KidsCollection: images }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// update hero section
const updateKidsCollection = async (req, res) => {
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

        const kidsCollection = await KidsCollection.findByIdAndUpdate(imageId, payload, { new: true }); // find hero section image and update 
        if (!kidsCollection) {
            return res.status(404).json({ success : false, error: " Section not found" }); // check image id 
        }

        return res.status(200).json({success : true, update_KidsCollection_Section: kidsCollection }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// delete hero section 

const deleteKidsCollection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get image id

        if (!sectionId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await KidsCollection.findByIdAndDelete(sectionId); // find image and delete
        if (!image) {
            return res.status(404).json({ success : false, error: " section not found" }); // check image id 
        }

        return res.status(200).json({success : true, Message: "kids collection section has been deleted", deleted_KidsCollection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

module.exports = {registerKidsCollection, getAllKidsCollection,getKidsCollection,updateKidsCollection, deleteKidsCollection};
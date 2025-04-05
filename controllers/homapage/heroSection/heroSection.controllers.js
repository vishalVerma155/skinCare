const { HeroSection } = require('../../../models/homepage/heroSection/heroSection.model.js');

// register hero section image
const registerHeroSection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        const {heading, subHeading} = req.body;
        if (!image || heading) {
            return res.status(404).json({success : false, error: "Image and heading are compulsary" });
        }

        const createdHeroSection = new HeroSection({
            image,
            heading,
            subHeading
        });
        await createdHeroSection.save(); //  save logo

        if (!createdHeroSection) {
            return res.status(500).json({success : false, error: "Error in create hero section in database" }); // check if logo is saved or not
        }

        return res.status(200).json({success : true,  Message: "Hero section sucessfully created", heroSection :createdHeroSection }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get all hero section image
const getHeroSection = async (req, res) => {
    try {
        const imageId = req.params.sectionId; // get image id

        if (!imageId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await HeroSection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ success : false, error: "Hero section not found" }); // check image id 
        }

        return res.status(200).json({success : true, Hero_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// get all hero section
const getAllHeroSection = async (req, res) => {
    try {
        const images = await HeroSection.find(); // find all images
        return res.status(200).json({success : true, All_Hero_Sections: images }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// update hero section
const updateHeroSection = async (req, res) => {
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

        const heroSection = await HeroSection.findByIdAndUpdate(imageId, payload, { new: true }); // find hero section image and update 
        if (!heroSection) {
            return res.status(404).json({ success : false, error: "Section id not found" }); // check image id 
        }

        return res.status(200).json({success : true, update_Hero_Section: heroSection }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

// delete hero section 

const deleteHeroSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get image id

        if (!sectionId) {
            return res.status(404).json({ success : false, error: "section id not found" }); // check image id 
        }

        const image = await HeroSection.findByIdAndDelete(sectionId); // find image and delete
        if (!image) {
            return res.status(404).json({ success : false, error: "Wrong section id. hero section not found" }); // check image id 
        }

        return res.status(200).json({success : true, Message: "hero section image has been deleted", deleted_HeroSection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ success : false, error: error.message });
    }
}

module.exports = {registerHeroSection, getAllHeroSection,getHeroSection,updateHeroSection, deleteHeroSection};

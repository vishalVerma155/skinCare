const { CompayLogo } = require('../../models/companyLogo/companyLogo.model.js');



// register company logo
const registerCompanyLogo = async (req, res) => {
    try {
        const logo = req.file?.path || undefined; // get image

        if (!logo) {
            return res.status(404).json({ Message: "Logo not found" });
        }


        if (req.user.userName !== 'admin') {
            return res.status(404).json({ success: false, error: "Only admin can create logo" });
        }

        

        const createdLogo = new CompayLogo({
            image: logo,
        });
        await createdLogo.save(); //  save logo

        if (!createdLogo) {
            return res.status(500).json({ Message: "Error in create logo in database" }); // check if logo is saved or not
        }

        return res.status(200).json({ Message: "Company logo sucessfully register", company_Logo: createdLogo }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });

    }
}

// get company logo
const getCompanyLogo = async (req, res) => {
    try {
        const logoId = req.params.logoId; // get logo id

        if (!logoId) {
            return res.status(404).json({ Message: "Logo id not found" }); // check logo id 
        }

        const logo = await CompayLogo.findById(logoId); // find logo 
        if (!logo) {
            return res.status(404).json({ Message: "Wrong logo id. Logo id not found" }); // check logo id 
        }

        return res.status(200).json({ Logo: logo }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get all company logo
const getAllCompanyLogo = async (req, res) => {
    try {
        const logos = await CompayLogo.find(); // find all logo 
        return res.status(200).json({ AllLogos: logos }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// update logo by id

const updateCompanyLogo = async (req, res) => {
    try {
        const logoId = req.params.logoId; // get logo id
        const newLogo = req.file ? req.file.path : undefined;

        if (!logoId) {
            return res.status(404).json({ Message: "Logo id not found" }); // check logo id 
        }

        if (!newLogo) {
            return res.status(404).json({ Message: "Logo not found" }); // check logo id 
        }

        const logo = await CompayLogo.findByIdAndUpdate(logoId, { image: newLogo }, { new: true }); // find logo and update 
        if (!logo) {
            return res.status(404).json({ Message: "Wrong logo id. Logo id not found" }); // check logo id 
        }

        return res.status(200).json({ Logo: logo }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// delete logo

const deleteCompanyLogo = async (req, res) => {
    try {
        const logoId = req.params.logoId; // get logo id

        if (!logoId) {
            return res.status(404).json({ success: false, error: "Logo id not found" }); // check logo id 
        }

        const logo = await CompayLogo.findByIdAndDelete(logoId); // find logo and delete


        if (!logo) {
            return res.status(404).json({ success: false, error: "Wrong logo id. Logo id not found" }); // check logo id 
        }

        const cloudinaryRes = await cloudinary.uploader.destroy(logo.publicId);


        return res.status(200).json({ success: true, Message: "Logo has been deleted", deletedLogo: logo, cloudinary_res: cloudinaryRes.result }); // return response
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}


module.exports = { registerCompanyLogo, getAllCompanyLogo, getCompanyLogo, updateCompanyLogo, deleteCompanyLogo };
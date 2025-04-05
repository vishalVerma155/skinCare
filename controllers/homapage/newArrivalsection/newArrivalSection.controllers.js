const { NewArrivalSection } = require('../../../models/homepage/newArrivalSection/newArrivalSection.model.js');

// register NewArrival section
const registerNewArrivalSection = async (req, res) => {
    try {
        const files = req.files; // get images

        if (!files) {
            return res.status(401).json({success : false, error: "images not found" });
        }

        const newArrivalImage1 = req.files.newArrivalImage1[0].path;
        const newArrivalImage2 = req.files.newArrivalImage2[0].path;

        const newArrivalSection = new NewArrivalSection({
            image1: { path: newArrivalImage1 },
            image2: { path: newArrivalImage2 },
        }); // create sale section

        await newArrivalSection.save();

        if (!newArrivalSection) {
            return res.status(401).json({success : false, error: "images not saved in database" }); // check new Arrival section
        }
        return res.status(200).json({success : true, Message: "New arrival section has been created", newArrival_Section: newArrivalSection }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// update  images in arrival section 
const updateImageNewArrivalSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get section id
        const files = req.files;

        
        if (!sectionId) {
            return res.status(401).json({success : false, error: " section id not found" }); // check section id
        }

        const section = await NewArrivalSection.findById(sectionId); // find and update image

        if (!section) {
            return res.status(401).json({success : false, error: "Section not found. Wrong Section id" }); 
        }

        if(files?.newArrivalImage1){
            section.image1.path = files.newArrivalImage1[0].path;
        }
       
        
        if(files?.newArrivalImage2){
            section.image2.path = files.newArrivalImage2[0].path;
        }

        await section.save();

        return res.status(200).json({ success : true, Message: "Image has been updated", updated_NewArrival_Section: section }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

// get update whole new arrival section
// const updateNewArrivalSection = async (req, res) => {
//     try {
//         const sectionId = req.params.sectionId; // get section id
//         const files = req.files; // get images

//         if (!files) {
//             return res.status(401).json({ Message: "new images path not found" }); // check new image
//         }
//         if (!sectionId) {
//             return res.status(401).json({ Message: "sale section id not found" }); // check section id
//         }

//         const images = files.map((file) => ({
//             path: file.path
//         })); // get images

//         const updatedNewArrivalSection = await NewArrivalSection.findByIdAndUpdate(sectionId, { image: images }, { new: true }); // find and update image

//         if (!updatedNewArrivalSection) {
//             return res.status(404).json({ Message: "New arrival section not found. Wrong brand section id" });
//         }

//         return res.status(200).json({ Message: "New Arrival section has been updated", updated_NewArrival_Section: updatedNewArrivalSection }); // 

//     } catch (error) {
//         return res.status(400).json({ Error: error.message });
//     }
// }

// view all new arrival sections section
const getAllNewArrivalSection = async (req, res) => {
    try {
        const list = await NewArrivalSection.find();
        return res.status(200).json({ All_NewArrival_section: list });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get new arrival section
const getNewArrivalSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get section id
        if (!sectionId) {
            return res.status(401).json({ Message: " section id not found" }); // check section id
        }

        const section = await NewArrivalSection.findById(sectionId); // find section

        if (!section) {
            return res.status(404).json({ Message: "Wrong new arrival section id. section not found" });
        }

        return res.status(200).json({ status: "successfull", new_Arrival_section: section }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// delete new arrival section
const deleteNewArrivalSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get section id
        if (!sectionId) {
            return res.status(401).json({ Message: " section id not found" }); // check section id
        }

        const section = await NewArrivalSection.findByIdAndDelete(sectionId); // find section and delete

        if (!section) {
            return res.status(404).json({ Message: "Wrong  section id. New arrival section not found" });
        }

        return res.status(200).json({ Message: "successfull deleted", deleted_New_Arrival_section: section });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

module.exports = { registerNewArrivalSection, updateImageNewArrivalSection,getAllNewArrivalSection, getNewArrivalSection, deleteNewArrivalSection };
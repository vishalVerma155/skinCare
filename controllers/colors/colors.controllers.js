const Color = require('../../models/colors/colors.model.js')

// Add colors array
const createColors = async (req, res) => {
    try {
        const colors = req.body.colors; // Ensure we extract the array

        if (!Array.isArray(colors)) {
            return res.status(400).json({ error: "Colors must be an array of hex codes." });
        }

        const color = new Color({ colors });
        await color.save();

        return res.status(201).json({ success: true, color });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const addColors = async (req, res) => {
    try {
        const newColors = req.body.colors;
        if (!Array.isArray(newColors)) {
            return res.status(400).json({ error: "Colors must be an array of hex codes." });
        }

        let colorDoc = await Color.findOne();

        console.log(colorDoc.colors);
        const uniqueColors = [...new Set([...colorDoc.colors, ...newColors])];
        colorDoc.colors = uniqueColors;


        await colorDoc.save();
        return res.status(200).json({ success: true, colors: colorDoc.colors, total_Colors : colorDoc.colors.length });

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

// Get all colors
const getAllColors = async (req, res) => {
    try {
        const colors = await Color.find();
        return res.status(201).json({ success: true, all_Colors: colors[0].colors, total_Colors : colors[0].colors.length });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createColors, getAllColors, addColors };
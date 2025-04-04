const Ad = require("../models/ads");

const createAds = async (req, res) => {
    try {
        const { title, description, targetAudience, budget } = req.body;
        if (!title || !description || !targetAudience || !budget) {
            return res.status(400).json({ message: "All fields are empty" });
        }
        const newAds = new Ad({
            title,
            description,
            targetAudience,
            budget,
            advertiserId: req.user.id,
        })
        await newAds.save();
        res.status(200).json({ message: "Ad succesfully created", ad: newAds })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createAds };
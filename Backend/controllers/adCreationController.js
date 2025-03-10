const Ad = require("../models/adsModel");

const createAds = async (req, res) => {
    try {
        const { title, description, targetAudience, longitude_latitude, adType, adDimensions, adDuration, budget, stateId, cityId, areaId } = req.body;
        if (!title || !description || !targetAudience || !budget || !adType || !adDuration) {
            return res.status(400).json({ message: "All fields are empty" });
        }
        const newAds = new Ad({
            title,
            description,
            targetAudience,
            longitude_latitude,
            adType,
            adDimensions,
            adDuration,
            budget,
            stateId,
            cityId,
            areaId,
            advertiserId: req.user.id

        })
        await newAds.save();

        const populatedAd = await Ad.findById(newAds._id)
            .populate("stateId", "name")
            .populate("cityId", "name")
            .populate("areaId", "name")
        console.log(populatedAd.areaId);

        res.status(200).json({ message: "Ad succesfully created", ad: populatedAd })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}



module.exports = { createAds };
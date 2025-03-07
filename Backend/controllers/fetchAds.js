const Ad = require("../models/adsModel");
const getAds = async (req, res) => {
    try {
        const ads = await Ad.find({ advertserId: req.user._id })
            .populate("stateId", "name")
            .populate("cityId", "name")
            .populate("areaId", "name")
            .sort({ createdAt: -1 });

        console.log("fetched ads:", ads);
        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
module.exports = { getAds };
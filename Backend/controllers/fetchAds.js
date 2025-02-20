const Ad = require("../models/ads");
const getAds = async (req, res) => {
    try {
        const ads = await Ad.find({ advertserId: req.user._id });
        console.log("fetched ads:", ads);
        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
module.exports = { getAds };
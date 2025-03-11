const Ad = require("../models/adsModel");
const getAds = async (req, res) => {

    const { id } = req.params;
    try {

        const ads = await Ad.find({
            advertiserId: id
        })
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

const getAdsByCityId = async (req, res) => {
    cityId = req.params.cityId;
    try {

        const adsByCity = await Ad.find({ cityId: cityId }).populate("cityId", "name").populate("areaId", "name");
        console.log(adsByCity)
        res.status(200).json({ message: "Ads by city:", ads: adsByCity })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// const getAdsbyAreaId = async (req, res) => {
//     areaId = req.params.areaId;
//     try {
//         const adsByArea = await Ad.find({ areaId: areaId });
//         res.status(200).json({ message: "Ads by Area:", ads: adsByArea })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }
module.exports = { getAds, getAdsByCityId };
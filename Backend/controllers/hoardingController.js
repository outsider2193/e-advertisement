const hoardingModel = require("../models/hoardingModel");

const createHoarding = async (req, res) => {

    try {
        const { latitude_longitude, dimension, status, hourlyRate, hoardingUrl, adType, stateId, cityId, areaId } = req.body;
        const hoarding = new hoardingModel(
            {
                latitude_longitude,
                dimension,
                status,
                hourlyRate,
                hoardingUrl,
                adType,
                stateId,
                cityId,
                areaId

            }
        )
        await hoarding.save();
        res.status(200).json({ message: "Hoarding created succesfully", hoarding: hoarding })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

const getHoardings = async (req, res) => {
    try {
        const hoardings = await hoardingModel.find().populate("stateId cityId areaId");
        res.status(200).json(hoardings);
    } catch (error) {
        console.error("Error fetching hoardings:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { createHoarding, getHoardings };
const Ad = require("../models/adsModel");
const multer = require("multer");
const path = require("path");
const cloudinaryMiddleware = require("../middleware/cloudinaryMiddleware");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({
    storage: storage,
}).single("image");

const createAds = async (req, res) => {
    try {
        const { title, description, targetAudience, longitude_latitude, adType, adDimensions, adDuration, budget, adUrl, stateId, cityId, areaId } = req.body;
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
            adUrl,
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

const createAdsWithFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
        else {
            const cloudinaryResponse = await cloudinaryMiddleware.uploadFile(req.file);
            console.log(cloudinaryResponse);
            req.body.adUrl = cloudinaryResponse.secure_url;
            try {
                const newAds = await Ad.create(req.body);
                res.status(200).json({ message: "Ad saved", data: newAds })
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error uploading file" }, error);
            }



        }
    })



}


module.exports = { createAds, createAdsWithFile };
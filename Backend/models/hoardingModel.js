const mongoose = require("mongoose");

const hoardingSchema = new mongoose.Schema({
    latitude_longitude: { type: String, required: true },
    dimension: { type: String, required: true },
    status: { type: Boolean, required: true },
    hourlyRate: { type: Number, required: true },
    hoardingUrl: { type: String, required: true },
    adType: {
        type: String,
        enum: ["billboard", "digital", "unipole", "gantry"],
        required: true,
    },
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true }

}, { timestamps: true });

module.exports = mongoose.model("Hoarding", hoardingSchema);
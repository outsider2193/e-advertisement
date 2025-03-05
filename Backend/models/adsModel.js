const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetAudience: { type: String, required: true },
    longitude_latitude: { type: String, required: true },
    adType: { type: String, required: true },
    adDimensions: { type: String },
    adDuration: { type: Number, required: true },
    budget: { type: Number, required: true },
    advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Ad", adSchema);

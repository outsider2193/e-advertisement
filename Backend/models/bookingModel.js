const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adId: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    displayFrequency: {
        type: String,
        enum: ["low", "standard", "high", "premium"],
        default: "standard"
    },
    specialPlacement: { type: String },
    contactPerson: { type: String },
    specialInstructions: { type: String },
    analyticsRequired: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["confirmed", "pending", "rejected"],
        default: "pending",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema);



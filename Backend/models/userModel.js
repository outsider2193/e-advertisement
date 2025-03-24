const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["viewer", "admin", "advertiser"],
        default: "viewer"
    },
    savedAds: { type: [mongoose.Schema.Types.ObjectId], ref: "Ad", default: [] },
    verified: { type: Boolean, default: false }


}, { timestamps: true });




module.exports = mongoose.model("User", userSchema);
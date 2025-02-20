const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { getAds } = require("../controllers/fetchAds");

router.get("/ads", verifyToken, authorizedRoles("viewer", "advertiser"), getAds);

module.exports = router;
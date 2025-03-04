const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { getAds } = require("../controllers/fetchAds");

router.get("/ads", verifyToken, authorizedRoles("viewer", "advertiser", "admin"), getAds);

module.exports = router;
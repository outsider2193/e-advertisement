const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { createAds, createAdsWithFile } = require("../controllers/adCreationController");


router.post("/advertiser/createads", verifyToken, authorizedRoles("advertiser"), createAds);
router.post("/advertiser/createadswithfile", verifyToken, authorizedRoles("advertiser"), createAdsWithFile);

module.exports = router;
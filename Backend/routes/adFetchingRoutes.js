const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { getAds, getAdsByCityId } = require("../controllers/fetchAds");

router.get("/ads", verifyToken, authorizedRoles("viewer", "advertiser", "admin"), getAds);
router.get("/ads/city/:cityId", verifyToken, authorizedRoles("advertiser"), getAdsByCityId);
router.get("/ads/area/:areaId", verifyToken, authorizedRoles("advertiser"), getAdsbyAreaId)
module.exports = router;
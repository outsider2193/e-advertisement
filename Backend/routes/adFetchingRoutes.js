const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { getAds, getAdsByCityId, getallAds, getAdsById } = require("../controllers/fetchAds");

router.get("/ads/:id", verifyToken, authorizedRoles("advertiser", "admin"), getAds);
router.get("/ads/city/:cityId", verifyToken, authorizedRoles("advertiser"), getAdsByCityId);
router.get("/ads/:id", verifyToken, authorizedRoles("viewer", "admin"), getAdsById);
router.get("/ads/city/:cityId", verifyToken, authorizedRoles("advertiser","viewer"), getAdsByCityId);
router.get("/browseads", verifyToken, authorizedRoles("viewer"), getallAds);
// router.get("/ads/area/:areaId", verifyToken, authorizedRoles("advertiser"), getAdsbyAreaId)
module.exports = router;
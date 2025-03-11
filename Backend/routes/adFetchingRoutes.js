const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { getAds, getAdsByCityId } = require("../controllers/fetchAds");

router.get("/ads/:id", verifyToken, authorizedRoles("advertiser", "admin"), getAds);
router.get("/ads/city/:cityId", verifyToken, authorizedRoles("advertiser"), getAdsByCityId);
module.exports = router;
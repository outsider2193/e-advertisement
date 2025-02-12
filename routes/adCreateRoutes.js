const express = require("express");
const router = express.Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const { createAds } = require("../controllers/adCreationController");


router.post("/advertiser/createads", verifyToken, authorizedRoles("advertiser"), createAds);

module.exports = router;
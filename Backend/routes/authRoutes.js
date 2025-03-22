const express = require("express");
const { registerUser, loginUser, getUsersById } = require("../controllers/authController");
const { registerAdvertiser, loginAdvertiser, updateAdvertiserProfile, updateAdvertiserPassword } = require("../controllers/advertiserController")
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/register/advertiser", registerAdvertiser);
router.post("/login/advertiser", loginAdvertiser)
router.put("/updateprofile/:id", verifyToken, authorizedRoles("advertiser"), updateAdvertiserProfile);
router.put("/updatepassword/:id", verifyToken, authorizedRoles("advertiser"), updateAdvertiserPassword)
router.get("/advertiser/:id", verifyToken, authorizedRoles("advertiser", "admin"), getUsersById)
module.exports = router;

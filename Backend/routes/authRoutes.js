const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { registerAdvertiser, loginAdvertiser } = require("../controllers/advertiserController")
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/register/advertiser", registerAdvertiser);
router.post("/login/advertiser", loginAdvertiser)
module.exports = router;
//KUshal@!12
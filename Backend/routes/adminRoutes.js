const express = require("express");
const router = express.Router();
const { deleteAd, deleteUser, getAllusers, getUsersByRole } = require("../controllers/adminController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");


router.delete("/deleteads/:id", verifyToken, authorizedRoles("advertiser", "admin"), deleteAd);
router.delete("/deleteuser/:id", verifyToken, authorizedRoles("admin"), deleteUser);
router.get("/allusers", verifyToken, authorizedRoles("admin"), getAllusers);
router.get("/usersbyrole/:role", verifyToken, authorizedRoles("admin"), getUsersByRole);

module.exports = router;

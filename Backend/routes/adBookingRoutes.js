const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

router.post("/bookads", verifyToken, authorizedRoles("viewer"), createBooking)

module.exports = router;
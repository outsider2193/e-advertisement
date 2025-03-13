const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/bookingController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

router.post("/bookads", verifyToken, authorizedRoles("viewer"), createBooking)
router.get("/getbookings", verifyToken, authorizedRoles("viewer", "advertiser"), getBookings)

module.exports = router;
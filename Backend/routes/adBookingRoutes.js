const express = require("express");
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require("../controllers/bookingController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

router.post("/bookads/:adId", verifyToken, authorizedRoles("viewer"), createBooking)
router.get("/getbookings", verifyToken, authorizedRoles("viewer", "advertiser"), getBookings)
router.put("/updatebookingstatus/:id", verifyToken, authorizedRoles("advertiser"), updateBookingStatus);

module.exports = router;
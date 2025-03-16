const express = require("express");
const router = express.Router();
const { createBooking, getBookings, checkBookingStatus } = require("../controllers/bookingController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

router.post("/bookads/:adId", verifyToken, authorizedRoles("viewer"), createBooking)
router.get("/getbookings", verifyToken, authorizedRoles("viewer", "advertiser"), getBookings)
router.put("/updatebookingstatus", verifyToken, authorizedRoles("advertiser"), checkBookingStatus);

module.exports = router;
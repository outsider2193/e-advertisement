const booking = require("../models/bookingModel");
const ads = require("../models/adsModel");


const createBooking = async (req, res) => {

    try {
        const { adId, startTime, endTime } = req.body;

        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        if (startDate >= endDate) {
            return res.status(400).json({ message: "startTime must be before endTime" });
        }

        if (startDate < new Date()) {
            return res.status(400).json({ message: "startTime must be in the future" });
        }
        const newBookings = new booking({
            clientId: req.user.id,
            adId,
            startTime: startDate,
            endTime: endDate
        });
        await newBookings.save();
        const fullBooking = await booking.findById(newBookings._id).populate("adId");
        res.status(200).json({ message: "Booking done", newBookings })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { createBooking }
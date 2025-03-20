const booking = require("../models/bookingModel");
const ads = require("../models/adsModel");


const createBooking = async (req, res) => {

    try {
        const { startTime, endTime } = req.body;
        const adId = req.params.adId;

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
            endTime: endDate,

        });
        await newBookings.save();
        const fullBooking = await booking.findById(newBookings._id).populate("adId");
        res.status(200).json({ message: "Booking done", fullBooking })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}



const getBookings = async (req, res) => {
    try {
        const allBookings = await booking.find().populate({
            path: "adId",
            select: "title description budget",
            populate: [
                {
                    path: "stateId",
                    select: "name"
                },
                {
                    path: "cityId",
                    select: "name"
                }
            ]
        }).sort({ createdAt: -1 });


        res.status(200).json({ message: "Bookings fetched", data: allBookings })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!["rejected", "confirmed"].includes(status)) {
        return res.status(400).json({ message: "Invalid values for status" });

    }
    try {

        const updatedBooking = await booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Ad not found" });
        }
        res.status(200).json({ message: "Booking status updated", data: updatedBooking });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { createBooking, getBookings, updateBookingStatus }
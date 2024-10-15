const mongoose = require('mongoose');

const travelScheduleSchema = new mongoose.Schema({
    place_id: { type: mongoose.Types.ObjectId, ref: "Place", required: true }, 
    number_of_guests: { type: Number, required: true },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }], 
    travel_date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TravelSchedule", travelScheduleSchema); 

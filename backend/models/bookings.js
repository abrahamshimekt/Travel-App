const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },  
    place_id: { type: mongoose.Types.ObjectId, ref: "Place", required: true }, 
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    status: { type: String, required: true, default: "pending" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingsSchema); 

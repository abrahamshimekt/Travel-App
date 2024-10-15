const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: mongoose.Types.ObjectId, ref: "Address" }, 
    entry_price: { type: Number },
    description: { type: String, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }], 
    photos: [{ type: mongoose.Types.ObjectId, ref: "Photo" }],   
    created_by: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, 
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Place", placeSchema); 

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    place_id: { type: mongoose.Types.ObjectId, ref: "Place", required: true }, 
    photo_url: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Photo", photoSchema); 

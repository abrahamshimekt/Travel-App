const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    review_text: { type: String, required: true },
    place_id: { type: mongoose.Types.ObjectId, ref: "Place", required: true }, 
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },  
    rating: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewsSchema); 

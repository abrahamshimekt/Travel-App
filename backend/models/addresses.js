const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    region: { type: String, required: true },
    zone: { type: String, required: true },
    woreda: { type: String, required: true },
    city: { type: String, required: true },
    altitude: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    distance_from_city_center: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Address", addressSchema); 

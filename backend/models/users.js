const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true }, 
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "traveler", "guide"] ,default: "traveler" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

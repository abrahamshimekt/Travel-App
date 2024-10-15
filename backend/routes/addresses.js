const express = require("express");
const router = express.Router();
const Address = require("../models/addresses");
const User = require("../models/users");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// @route    POST addresses/    
// @desc     Create a new address
// @access   Private
router.post(
  "/",
  [
    check("street", "Street is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("zip", "Zip is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { street, city, state, zip } = req.body;

    try {
      const address = new Address({
        street,
        city,
        state,
        zip,
      });
      await address.save();
      res.json(address);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET addresses/
// @desc     Get all addresses
// @access   Public
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
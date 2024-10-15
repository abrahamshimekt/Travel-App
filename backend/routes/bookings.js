const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');
const Place = require('../models/places');
const User = require('../models/users');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// @route    POST bookings/
// @desc     Create a new booking
// @access   Private
router.post(
  '/',
  [
    check('place_id', 'Place ID is required').not().isEmpty(),
    check('check_in', 'Check in date is required').not().isEmpty(),
    check('check_out', 'Check out date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { place_id, check_in, check_out } = req.body;

    try {
      const place = await Place.findById(place_id);
      if (!place) {
        return res.status(404).json({ msg: 'Place not found' });
      }

      const booking = new Booking({
        place_id,
        user_id: req.user.id,
        check_in,
        check_out,
      });

      await booking.save();
      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET bookings/
// @desc     Get all bookings
// @access   Public
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET bookings/:id
// @desc     Get booking by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET bookings/user/:id
// @desc     Get bookings by user ID
// @access   Public
router.get('/user/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.id });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
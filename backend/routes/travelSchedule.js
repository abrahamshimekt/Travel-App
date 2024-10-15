const expresss = require('express');
const router = expresss.Router();
const TravelSchedule = require('../models/travelSchedules');
const Place = require('../models/places');
const User = require('../models/users');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
// @route    POST travelSchedules/
// @desc     Create a new travel schedule
// @access   Private
router.post('/', async (req, res) => {
  const {
    user_id,
    place_id,
    check_in,
    check_out,
    created_at,
    updated_at
  } = req.body;
  try {
    const place = await Place.findById(place_id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }
    const travelSchedule = new TravelSchedule({
      user_id,
      place_id,
      check_in,
      check_out,
      created_at,
      updated_at
    });
    await travelSchedule.save();
    res.json(travelSchedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET travelSchedules/
// @desc     Get all travel schedules
// @access   Public
router.get('/', async (req, res) => {
  try {
    const travelSchedules = await TravelSchedule.find();
    res.json(travelSchedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Place = require('../models/places');
const Review = require('../models/reviews');
const Photo = require('../models/photos');
const User = require('../models/users');
const Booking = require('../models/bookings');
const Address = require('../models/addresses');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
// @route    POST places/
// @desc     Create a new place
// @access   Private
router.post('/', async (req, res) => {
  const {
    name,
    address,
    entry_price,
    description,
    reviews,
    photos,
    created_by,
    created_at,
    updated_at
  } = req.body;
  try {
    const place = new Place({
      name,
      address,
      entry_price,
      description,
      reviews,
      photos,
      created_by,
      created_at,
      updated_at
    });
    await place.save();
    res.json(place);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET places/
// @desc     Get all places
// @access   Public
router.get('/', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET places/:id
// @desc     Get place by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }
    res.json(place);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Place not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT places/:id
// @desc     Update place by ID
// @access   Private
router.put('/:id',  async (req, res) => {
  const {
    name,
    address,
    entry_price,
    description,
    reviews,
    photos,
    created_by,
    created_at,
    updated_at
  } = req.body;
  try {
    let place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }
    place = await Place.findByIdAndUpdate(
      req.params.id,
      { name,
        address,
        entry_price,
        description,
        reviews,
        photos,
        created_by,
        created_at,
        updated_at },
      { new: true }
    );
    res.json(place);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Place not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE places/:id
// @desc     Delete place by ID
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }
    await Place.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Place removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Place not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
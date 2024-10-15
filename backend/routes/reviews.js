const express = require("express");
const router = express.Router();
const Review = require("../models/reviews");
const Place = require("../models/places");
const User = require("../models/users");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// @route    POST reviews/
// @desc     Create a new review
// @access   Private
router.post(
  "/",
  [
    check("review_text", "Review text is required").not().isEmpty(),
    check("place_id", "Place ID is required").not().isEmpty(),
    check("rating", "Rating is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { review_text, place_id, rating } = req.body;

    try {
      const place = await Place.findById(place_id);
      if (!place) {
        return res.status(404).json({ msg: "Place not found" });
      }

      const review = new Review({
        review_text,
        place_id,
        user_id: req.user.id,
        rating,
      });

      await review.save();
      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET reviews/
// @desc     Get all reviews
// @access   Public
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET reviews/:id
// @desc     Get review by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET reviews/place/:id
// @desc     Get reviews by place ID
// @access   Public
router.get("/place/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ place_id: req.params.id });
    if (!reviews) {
      return res.status(404).json({ msg: "Reviews not found" });
    }
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET reviews/user/:id
// @desc     Get reviews by user ID
// @access   Public
router.get("/user/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ user_id: req.params.id });
    if (!reviews) {
      return res.status(404).json({ msg: "Reviews not found" });
    }
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT reviews/:id
// @desc     Update review by ID
router.put("/:id",  async (req, res) => {
  const { review_text, rating } = req.body;

  const reviewFields = {};
  if (review_text) reviewFields.review_text = review_text;
  if (rating) reviewFields.rating = rating;

  try {
    let review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ msg: "Review not found" });

    // Make sure user owns review
    if (review.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: reviewFields },
      { new: true }
    );

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE reviews/:id
// @desc     Delete review by ID
// @access   Private
router.delete("/:id",  async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ msg: "Review not found" });

    // Make sure user owns review
    if (review.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Review.findByIdAndRemove(req.params.id);

    res.json({ msg: "Review removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

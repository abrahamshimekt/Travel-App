const expresss = require("express");
const router = expresss.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { generateToken } = require("../utils/generateToken");
const { ObjectId } = mongoose.Types;
// @route    POST users/
// @desc     Create a new user
// @access   Public
router.post(
  "/signup",
  [
    check("first_name", "First name is required").not().isEmpty(),
    check("last_name", "Last name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phone_number", "Phone number is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          message: "እባክዎትን ሁሉንም ቦታዎች በትክክል መሙላትዎን ያረጋግጡ።",
          errors: errors.array(),
        });
    }

    const { first_name, last_name, username, email, phone_number, password } =
      req.body;

    try {
      const hashed_password = await bcrypt.hash(password, 10);

      let existingEmail = await User.findOne({ email });
      let existingUsername = await User.findOne({ username });

      if (existingEmail) {
        return res.status(400).json({ message: "የተመዘገበ ኢሜል ተጠቅመዋል።" });
      }

      if (existingUsername) {
        return res.status(400).json({ message: "የተመዘገበ መለያ ስም ተጠቅመዋል።" });
      }

      const user = new User({
        first_name,
        last_name,
        username,
        email,
        phone_number,
        password: hashed_password,
      });

      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST users/login
// @desc     Login user
// @access   Public

router.post(
  "/login",
  [
    check("username", "username is required").exists(),
    check("password", "Password is required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          message: "እባክዎትን ሁሉንም ቦታዎች በትክክል መሙላትዎን ያረጋግጡ።",
          errors: errors.array(),
        });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        username,
      });

      if (!user) {
        return res.status(400).json({ message: "የተጠቀሙት መለያ ስም ወይም የይለፍ ቃል የተሳሳተ ነው።" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "የተጠቀሙት ኢሜል ወይም የይለፍ ቃል የተሳሳተ ነው።" });
      }
    
      const token = generateToken({id:user._id,username:user.username,password:user.password,role:user.role});
      res.json(token);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET users/
// @desc     Get all users
// @access   Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

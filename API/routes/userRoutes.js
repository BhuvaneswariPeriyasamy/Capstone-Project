const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt
const router = express.Router();
const User = require("../models/User");
const Counter = require("../models/Counter");

const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

// Create a new user with hashed password
router.post("/create", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    province,
    postalcode,
  } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const userId = await getNextSequence("userId");
    console.log(userId);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      firstname,
      lastname,
      email,
      password: hashedPassword, // Store the hashed password
      address,
      city,
      province,
      postalcode,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login route with password verification
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    req.session.user = { id: user.userId, firstname: user.firstname };
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/session", (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logout successful" });
  });
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userId: req.params.id });
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user by ID
router.put("/update/:id", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    state,
    postalcode,
  } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.id },
      {
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        state,
        postalcode,
      },
      { new: true } // Return the updated document
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
module.exports = router;
=======
<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590

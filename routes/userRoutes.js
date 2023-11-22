const express = require("express");
const router = express.Router();
const path = require("path");
const { User } = require("../models");
const { generateToken } = require("../../config/auth"); // 

// Function for consistent error response
const sendErrorResponse = (res, statusCode, message) => {
  console.error(message);
  res.status(statusCode).json({ message });
};

// Function for validating email and password
const validateEmailAndPassword = (email, password) => {
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password && password.length >= 8;
  return isValidEmail(email) && isValidPassword(password);
};

// Serve the static login page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html")); // Adjust the path as necessary
});

// Endpoint for user registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!validateEmailAndPassword(email, password)) {
    return sendErrorResponse(res, 400, "Invalid email or password");
  }

  try {
    const newUser = await User.create(req.body);
    const userResponse = newUser.get({ plain: true });
    delete userResponse.password; // Do not send the password back in the response
    res.status(200).json(userResponse);
  } catch (err) {
    sendErrorResponse(res, 500, "Registration Error");
  }
});

// Endpoint for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!validateEmailAndPassword(email, password)) {
    return sendErrorResponse(res, 400, "Invalid email or password");
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.checkPassword(password)) {
      return sendErrorResponse(res, 401, "Incorrect email or password");
    }

    const token = generateToken(user); // 
    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
      message: "You are now logged in!",
    });
  } catch (err) {
    sendErrorResponse(res, 500, "Login Error");
  }
});

module.exports = router;

const express = require("express");
const controller = express.Router();
const Babysitter = require("../babysitters/babysitterModel");
const Guardian = require("../guardians/guardianModel");


// Login route for both Guardians and Babysitters
controller.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for babysitter by email
        let user = await Babysitter.findOne({ email });
        let role = "babysitter";
    
        // If no babysitter is found, check for guardian by email
        if (!user) {
          user = await Guardian.findOne({ email });
          role = "guardian";
        }
    
        // If no user found in both collections
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        // If user found, compare password
        if (password !== user.password) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        // Successful Login
        res.status(200).json({
          message: "Login successful",
          role: role,
          userId: user._id
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

// Export routes
module.exports = controller;
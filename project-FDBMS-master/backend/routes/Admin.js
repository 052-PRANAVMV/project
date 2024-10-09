const express = require('express');
const router = express.Router();
const {createUser,checkUser} = require('../controller/User')
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.post('/auth/adminregister', async (req, res) => {
    try {
        const { id, fname, email, pass, dep, address, city, state, phone } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Hash the password
        const hashPassword = await bcrypt.hash(pass, 14);
    
        // Create a new user
        const newUser = new User({
          id,
          fname,
          email,
          pass: hashPassword,
          dep,
          address,
          city,
          state,
          phone
        });
    
        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ message: "Record registered" });
    
      } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
});


router.route('/auth/login').post(checkUser);


module.exports = router;



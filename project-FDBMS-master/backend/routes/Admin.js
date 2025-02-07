const express = require('express');
const router = express.Router();
const {createUser,checkUser} = require('../controller/User')
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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


router.post('/auth/login' , async (req, res, next) => {
  console.log('Hi')
  const { email, password } = req.body;

  // Default Admin Credentials
  const defaultAdminEmail = 'adminvcet@gmail.com';
  const defaultAdminPassword = 'vcet1234';

  try {
      console.log(`Checking user with email: ${email}`);

      // Check if the provided email and password match the default admin credentials
      if (email === defaultAdminEmail && password === defaultAdminPassword) {
          console.log("Default admin login successful!");

          // Generate token for the default admin
          const token = jwt.sign({ username: 'Admin' }, process.env.JWT_KEY, { expiresIn: '1h' });
          res.cookie('token', token, { httpOnly: true, maxAge: 360000 });

          return res.status(200).json({ status: true, message: "Admin login successful!" });
      }

      // Proceed with regular user authentication if not the default admin
      const user = await User.findOne({ email });
      if (!user) {
          console.log("User not found!");
          return res.status(400).json({ message: "User is not registered!" });
      }

      console.log(`User found: ${user}`);

      if (!user.pass) {
          console.error("User password is undefined");
          return res.status(500).json({ message: "Internal server error" });
      }

      const validPassword = await bcrypt.compare(password, user.pass); // Changed from user.password to user.pass
      if (!validPassword) {
          console.log("Invalid password!");
          return res.status(400).json({ message: "Password is incorrect!" });
      }

      const token = jwt.sign({ username: user.fname }, process.env.JWT_KEY, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 360000 });

      console.log("Login successful!");
      return res.status(200).json({ status: true, message: "Login successful!" });
  } catch (error) {
      console.error("Error during login process:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
}
)


module.exports = router;



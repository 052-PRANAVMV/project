const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    const { id, fname, email, pass, dep, address, city, state, phone } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.json({ message: "User already existed" });
    }

    const hashPassword = await bcrypt.hash(pass, 14);
    const newUser = new User({
        id,
        fname,
        email,
        password: hashPassword, // Ensure the field name matches
        dep,
        address,
        city,
        state,
        phone
    });

    await newUser.save();
    return res.json({ message: "Record registered" });
};



// exports.checkUser = async (req, res, next) => {
//     const { email, password } = req.body;
//     try {
//         console.log(`Checking user with email: ${email}`);

//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log("User not found!");
//             return res.status(400).json({ message: "User is not registered!" });
//         }

//         console.log(`User found: ${user}`);

//         if (!user.pass) {
//             console.error("User password is undefined");
//             return res.status(500).json({ message: "Internal server error" });
//         }

//         const validPassword = await bcrypt.compare(password, user.pass); // Changed from user.password to user.pass
//         if (!validPassword) {
//             console.log("Invalid password!");
//             return res.status(400).json({ message: "Password is incorrect!" });
//         }

//         const token = jwt.sign({ username: user.fname }, process.env.JWT_KEY, { expiresIn: '1h' });
//         res.cookie('token', token, { httpOnly: true, maxAge: 360000 });

//         console.log("Login successful!");
//         return res.status(200).json({ status: true, message: "Login successful!" });
//     } catch (error) {
//         console.error("Error during login process:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
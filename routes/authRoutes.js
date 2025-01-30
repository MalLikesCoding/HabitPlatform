const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const bcrypt = require('bcryptjs'); // For password hashing

// ✅ Debugging: Ensure this file is being loaded
console.log("✅ authRoutes.js is running and defining routes...");

// ✅ Test Route (Will be accessible at /api/auth/test)
router.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

// ✅ Register Route (Will be accessible at /api/auth/register)
router.post('/register', async (req, res) => {
    console.log("🚀 /api/auth/register route was hit!"); // Debugging log

    try {
        // Extract user details from request body
        const { username, email, password, age, occupation, countryOfOrigin } = req.body;

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Save hashed password
            age,
            occupation,
            countryOfOrigin,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('❌ Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ✅ Export the router
module.exports = router;







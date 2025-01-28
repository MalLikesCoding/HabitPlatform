console.log('Starting testUser.js...');

const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGO_URI) // Establish connection to MongoDB
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// Function to create a test user
const createTestUser = async () => {
  try {
    console.log('Creating test user...');
    const user = new User({
      username: 'Malachy M',
      email: 'malachy.montemurro@outlook.com',
      password: 'HAVElock257!', // Password is plain text for now
      age: 24,
      occupation: 'Student',
      countryOfOrigin: 'Canada',
    });

    const savedUser = await user.save(); // Save the user to the database
    console.log('User created successfully:', savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    mongoose.connection.close(); // Close the database connection
    console.log('Database connection closed.');
  }
};

// Run the test
createTestUser();



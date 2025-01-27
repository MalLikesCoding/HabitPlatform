// server.js

// 1. Import Packages
// - express: Web framework for Node.js (Creates the server and manages routes)
// - mongoose: MongoDB object modeling ( Manages interactions with your MongoDB database.)
// - dotenv: Loads environment variables from .env file
// - cors: Allows cross-origin requests to your API
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Load Environment Variables
// Calls dotenv.config() to read the .env file and populate process.env
dotenv.config();

// 3. Create Express App
// Initializes an Express instance to build our server and handle routes
// thought as the central object that defines how server behaves
//which rout it listens to, what middleware it uses, and how it responds to request
const app = express();

// 4. Middleware Setup
// cors() to allow cross-origin requests, express.json() to parse incoming JSON
app.use(cors());
app.use(express.json());

// 5. Check the MONGO_URI (Debugging)
console.log('MONGO_URI is:', process.env.MONGO_URI);

// 6. Database Connection
// Uses Mongoose to connect to MongoDB using the URI from the .env file
// Remove the deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


// 7. Default Route
// Basic route to confirm the API is running
app.get('/', (req, res) => {
  res.send('Habit Community Platform API is running.');
});

// 8. Start Server
// The server listens on the PORT defined in .env or defaults to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


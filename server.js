// server.js

// 1. Import Packages
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling
const dotenv = require('dotenv'); // Loads environment variables
const cors = require('cors'); // Enables cross-origin requests

// 2. Load Environment Variables
dotenv.config();

// 3. Create Express App
const app = express();

// 4. Middleware Setup
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// 5. Debug: Check Environment Variables
console.log('MONGO_URI is:', process.env.MONGO_URI);

// 6. Database Connection
// Connect to MongoDB using the URI in .env and handle connection errors
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process if database connection fails
  });

// 7. Default Route
// A basic route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Habit Community Platform API is running.');
});

// 8. Start Server
// Server listens on the PORT specified in .env or defaults to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


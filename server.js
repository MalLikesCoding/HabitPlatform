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

// 5. Import and Use Auth Routes (✅ Correctly Mounted)
try {
  const authRoutes = require('./routes/authRoutes'); // ✅ Import authentication routes
  app.use('/api/auth', authRoutes); // ✅ Mount routes under "/api/auth"
  console.log('✅ authRoutes.js loaded successfully under /api/auth');
} catch (error) {
  console.error('❌ Error loading authRoutes.js:', error);
}

// 6. Debug: Check Environment Variables
console.log('MONGO_URI is:', process.env.MONGO_URI);

// 7. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit process if database connection fails
  });

// 8. Default Route
app.get('/', (req, res) => {
  res.send('Habit Community Platform API is running.');
});

// 9. Debugging: List All Registered Routes (Including Nested Routes)
console.log('🔎 Listing all registered routes in server.js:');
app._router.stack.forEach((r) => {
  if (r.route) {
    console.log(`✅ Registered route: ${r.route.path} (Method: ${Object.keys(r.route.methods)})`);
  } else if (r.name === 'router') {
    r.handle.stack.forEach((nested) => {
      if (nested.route) {
        // Prefix with the mount path "/api/auth"
        console.log(`✅ Registered nested route: /api/auth${nested.route.path} (Method: ${Object.keys(nested.route.methods)})`);
      }
    });
  }
});

// 10. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});








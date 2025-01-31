// 1. Import Packages
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling
const dotenv = require('dotenv'); // Loads environment variables
const cors = require('cors'); // Enables cross-origin requests
const path = require('path'); // Utility for handling file paths

// 2. Load Environment Variables
dotenv.config();

// 3. Create Express App
const app = express();

// 4. Configure View Engine and Static Files
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// 5. Middleware Setup
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// 6. Import and Use Auth Routes (✅ Correctly Mounted)
try {
  const authRoutes = require('./routes/authRoutes'); // ✅ Import authentication routes
  app.use('/api/auth', authRoutes); // ✅ Mount routes under "/api/auth"
  console.log('✅ authRoutes.js loaded successfully under /api/auth');
} catch (error) {
  console.error('❌ Error loading authRoutes.js:', error);
}

// 7. Debug: Check Environment Variables
// ❌ Removed to prevent exposing sensitive information
// console.log('MONGO_URI is:', process.env.MONGO_URI);

// 8. Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit process if database connection fails
  });

// 9. Default Route - Render EJS Template
app.get('/', (req, res) => {
  res.render('index'); // Renders views/index.ejs
});

// 10. Debugging: List All Registered Routes (Including Nested Routes)
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

// 11. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});










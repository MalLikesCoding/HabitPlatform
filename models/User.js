const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same username
  },
  email: {
    type: String,
    required: false, // Optional if you decide not to use it
    unique: true, // Ensures no duplicate emails
  },
  password: {
    type: String,
    required: true, // Password is mandatory
  },
  age: {
    type: Number, // Numeric field for the user's age
    required: true,
  },
  occupation: {
    type: String, // Text field to describe occupation
    required: false, // Optional if not always needed
  },
  countryOfOrigin: {
    type: String, // Text field for the country
    required: true, // Mandatory
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);

// type: Defines the data type for the field (e.g., String, Number).
// required: true: Ensures the field must be provided when creating a user.
// unique: true: Ensures no two users have the same value for this field 
// (e.g., username or email).
// timestamps: true: Automatically adds createdAt and updatedAt timestamps to 
// each document



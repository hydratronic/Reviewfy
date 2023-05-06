const mongoose = require('mongoose');

// Define the schema for the review model
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user model
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create the Review model with the defined schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

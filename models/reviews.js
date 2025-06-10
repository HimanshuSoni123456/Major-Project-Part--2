// Import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for a review
const reviewSchema = new Schema({
  comment: String, // Review comment
  rating: {
    type: Number,
    min: 1, // Minimum rating
    max: 5, // Maximum rating
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set current date/time
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

// Export the Review model
module.exports = mongoose.model("Review", reviewSchema);

// Importing required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

// Define the schema for a Listing
const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
  },
  description: String, // Optional description
  image: {
    filename: {
      type: String,
      default: "defaultImage", // Default filename
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          : v, // Set default if empty string provided
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", // Reference to Review model
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to User model
  },
});

// Middleware: delete all associated reviews if a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

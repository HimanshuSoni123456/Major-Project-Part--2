// Script to seed the database with initial data
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/abn";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Function to initialize the database
const initDB = async () => {
  await Listing.deleteMany({}); // Remove existing listings
  // Add a default owner to each listing
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6842d51b487bf5206b132d99",
  }));
  await Listing.insertMany(initData.data); // Insert new listings
  console.log("Data was initialized");
};

initDB(); // Run the seeding script

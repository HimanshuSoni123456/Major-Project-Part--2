// Import required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Define the User schema
// Note: passport-local-mongoose automatically adds 'username' and 'password' fields
const userSchema = new Schema({
  email: {
    type: String,
    required: true, // Email is mandatory
  },
});

// Plugin to add username, password hashing, salting, and authentication methods
userSchema.plugin(passportLocalMongoose);

// Export the User model
module.exports = mongoose.model("User", userSchema);

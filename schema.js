// This file is for schema validation on the server side using Joi.
// For client-side validation, we can use HTML attributes like "required" in EJS files.

const Joi = require('joi'); // Import Joi for validation

// Schema to validate listings
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),                // Title is required
    description: Joi.string().required(),          // Description is required
    location: Joi.string().required(),             // Location is required
    country: Joi.string().required(),              // Country is required
    price: Joi.number().required().min(0),         // Price is required and must be >= 0
    image: Joi.object({
      url: Joi.string().allow("", null),           // URL can be empty or null
      filename: Joi.string()                       // Filename is optional
    })
  }).required()
});

// Schema to validate reviews
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5), // Rating must be between 1 and 5
    comment: Joi.string().required()               // Comment is required
  }).required()
});

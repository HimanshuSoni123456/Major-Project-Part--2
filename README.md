🏡 Vacation Rental Listing Web App – Part-2
This is the second phase of a full-stack web application built using Node.js, Express.js, MongoDB, and EJS. It allows users to create, view, edit, and delete vacation rental listings, along with features like user authentication, authorization, and review system.


🔧 Technologies & Tools Used
Backend:---
Node.js: JavaScript runtime for server-side logic.
Express.js: Web framework used to build RESTful routes and middleware.
MongoDB: NoSQL database for storing listings, users, and reviews.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
Passport.js: Authentication middleware using local strategy.
Joi: For backend request validation (form data).
Method-Override: Enables PUT and DELETE from forms



Frontend:---
EJS (Embedded JavaScript Templates): Used for rendering dynamic views.
Bootstrap 5: For responsive and modern UI styling.


Other Utilities:---
EJS-Mate: For EJS layout templates (boilerplate structure).
Connect-Flash: Flash messages for success/error alerts.
Express-Session: Used for session management.


Custom Middleware:---
isLoggedIn: Protects routes.
isOwner / isReviewAuthor: Enforces permissions.
validateListing, validateReview: Joi-based validation.


📦 Features Implemented in Phase 2
✅ User Authentication
Register, Login, and Logout using Passport.js.
User sessions maintained via express-session.

✅ Listings
Users can Create, Read, Update, and Delete rental listings.
Each listing contains: title, description, image URL, price, location, country, and owner reference.

✅ Authorization
Only logged-in users can create listings.
Only owners can edit or delete their own listings.
Review deletion is allowed only by the review’s author.

✅ Review System
Logged-in users can post a rating (1-5) and comment on listings.
Each listing displays all reviews.
Reviews are stored with user references.

✅ Form Validation
Client-side using HTML5 required.
Server-side using Joi schemas to prevent invalid data.

✅ Error Handling
Custom ExpressError class for structured error handling.
All undefined routes show a 404 page.
Validation errors and authorization issues are caught and shown via flash messages.

✅ UI Improvements
Cards for listings on home page with responsive grid.
Listing details show image, description, owner, and location info.
Flash messages are shown for errors and success feedback.
Buttons for "Edit", "Delete", and "Leave Review" appear conditionally.



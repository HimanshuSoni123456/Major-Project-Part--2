// ========================= Required Dependencies ========================= //
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// ========================= MongoDB Connection ========================= //
const MONGO_URL = "mongodb://127.0.0.1:27017/abn";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ========================= App Configuration ========================= //
app.engine("ejs", ejsMate); // Using EJS Mate for layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ========================= Middleware ========================= //
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(methodOverride("_method")); // To support PUT & DELETE via POST
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// ========================= Session Configuration ========================= //
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true // Helps prevent XSS attacks
  }
};

app.use(session(sessionOptions));
app.use(flash()); // Flash must be used after session

// ========================= Passport Configuration ========================= //
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // Use local strategy
passport.serializeUser(User.serializeUser()); // Serialize user info into session
passport.deserializeUser(User.deserializeUser()); // Deserialize user info from session

// ========================= Flash + Current User Middleware ========================= //
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // current logged-in user
  next();
});

// ========================= Routes ========================= //
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings", listingRouter); // Listings router
app.use("/listings/:id/reviews", reviewRouter); // Reviews router
app.use("/", userRouter); // User auth routes

// ========================= 404 Error Handler ========================= //
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// ========================= Global Error Handler ========================= //
app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// ========================= Start Server ========================= //
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

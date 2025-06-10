const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

/* ---------------- USER AUTH ROUTES ---------------- */

// GET signup form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// POST signup data and register the user
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Log the user in after registration
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect(req.session.redirectUrl || "/listings");
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

// GET login form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// POST login data and authenticate the user
router.post(
  "/login",
  saveRedirectUrl, // Middleware to save the redirect URL
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust! You are logged in.");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);

// LOGOUT route - logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;

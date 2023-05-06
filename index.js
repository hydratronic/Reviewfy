// Require necessary packages and modules
const express = require("express"); // Require Express web framework
const expressLayouts = require("express-ejs-layouts"); // Require EJS layout support
const mongoose = require("mongoose"); // Require Mongoose package for MongoDB database management
const session = require("express-session"); // Require Express Session middleware for managing user sessions
const dotenv = require("dotenv"); // Require dotenv package for handling environment variables
dotenv.config({ path: "./config.env" }); // Import the environment variables from config.env file

// Import Passport and Passport Local strategy for authentication
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo"); // Import MongoStore for managing MongoDB sessions

const db = require("./config/mongoose"); // Import Mongoose connection configuration from config/mongoose.js

// Assign values to constants
const PORT = process.env.PORT; // Set the server port number from environment variable

const app = express(); // Initialize the Express app

// Serve static files from assets directory
app.use(expressLayouts);
app.use(express.static("./assets"));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// Extract CSS and JS files from layout file
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Configure session middleware for managing user sessions
app.use(
  session({
    name: "employeeReview", // Name of the session cookie
    secret: "MicroTask", // Secret key for session cookie encryption
    saveUninitialized: false, // Do not save uninitialized sessions
    resave: false, // Do not save sessions that have not been modified
    cookie: {
      maxAge: 1000 * 60 * 100, // Set session cookie expiration time to 100 minutes
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI, // MongoDB connection URL from environment variable
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, // MongoDB options for connection
      ttl: 60 * 60 * 24, // Default expiration time for sessions is 1 day
    }),
  })
);

// Initialize and use Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set the authenticated user as a local variable for rendering views
app.use(passport.setAuthenticatedUser);

// Use routes defined in routes/index.js
app.use("/", require("./routes/index"));

// Start the server and log success/failure messages
app.listen(PORT, function (err) {
  if (err) {
    console.log("Error while connecting to server");
    return;
  }
  console.log(`Servers running on port ${PORT}`);
});

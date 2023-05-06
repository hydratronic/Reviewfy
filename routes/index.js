// Importing required packages and controllers
const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

// Route for the home page
router.get('/', passport.checkAuthentication, userController.home);

// Route for the user related endpoints
router.use('/users', require('./user'));

// Route for the admin related endpoints
router.use('/admin', require('./admin'));

// Route for the review related endpoints
router.use('/reviews', require('./review'));

// Exporting the router module
module.exports = router;

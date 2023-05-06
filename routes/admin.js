const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');

// Route to render the admin page, requires authentication
router.get('/admin-page', passport.checkAuthentication, adminController.adminPage);

// Route to set reviewers to employee, requires authentication
router.post('/set-Reviewers', passport.checkAuthentication, adminController.setReviewrs);

// Route to make a new admin an employee, requires authentication
router.post('/newAdmin', passport.checkAuthentication, adminController.newAdmin);

// Route to view all employees, requires authentication
router.get('/view-employees', passport.checkAuthentication, adminController.viewEmployees);

// Route to delete an employee by ID, requires authentication
router.get('/delete-employee/:id', passport.checkAuthentication, adminController.deleteEmployee);

module.exports = router;

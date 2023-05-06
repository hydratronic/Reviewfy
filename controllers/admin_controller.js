// Require the User and Review models
const User = require("../models/users");
const Review = require("../models/review");

// Render the admin page if the user is authenticated and an admin
// Passes an employeeList object containing all the employees in the database
// to be displayed on the admin page
module.exports.adminPage = async function (req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/users/login"); // Redirect to login page if user is not authenticated
  } else {
    if (req.user.isAdmin == false) { // Redirect if user is not an admin
      console.log("You are not an admin");
      return res.redirect("/");
    } else {
      try {
        let user = await User.find({}); // Get all the users from the database
        var employeeList = [];
        for (let i = 0; i < user.length; i++) { // Loop through all the users and create an array of objects containing only their name and id
          var temp = {
            name: user[i].name,
            id: user[i].id,
          };
          employeeList.push(temp);
        }

        return res.render("admin", { // Render the admin page with the title and employeeList object
          title: "ERS | Admin page",
          employeeList: employeeList,
        });
      } catch (err) {
        console.log("Error while admin", err);
        return;
      }
    }
  }
};

// Set a review for an employee
module.exports.setReviewrs = async function (req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/users/login"); // Redirect to login page if user is not authenticated
    } else {
      let employee = await User.findById(req.user.id); // Find the current user

      if (employee.isAdmin == false) { // Redirect if user is not an admin
        console.log("You are not an admin");
        return res.redirect("/");
      } else if (req.body.Reviewer == req.body.Recipient) { // Redirect if the reviewer and recipient are the same
        return res.redirect("back");
      } else {
        let reviewer = await User.findById(req.body.Reviewer); // Find the reviewer user

        // If reviewer not found
        if (!reviewer) {
          return res.redirect("back");
        }

        let recipient = await User.findById(req.body.Recipient); // Find the recipient user

        if (!recipient) {
          return res.redirect("back");
        }

        reviewer.to.push(recipient); // Add the recipient to the reviewer's 'to' array
        reviewer.save();

        recipient.from.push(reviewer); // Add the reviewer to the recipient's 'from' array
        recipient.save();

        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// Make an employee an admin
module.exports.newAdmin = async function (req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/users/login"); // Redirect to login page if user is not authenticated
    }
    if (req.user.isAdmin == true) { // Only allow admins to make other users admins
      let employee = await User.findById(req.body.newAdmin); // Find the employee to make an admin

      if (!employee) { // Redirect if the employee is not found
        return res.redirect("back");
      }

      if (employee.isAdmin == true) { // Redirect if the employee is already an admin
        return res.redirect("back");
      }

      if (employee.isAdmin == false
        ) {
          employee.isAdmin = true; // Set the employee's isAdmin flag to true
          employee.save(); // Save the updated employee object in the database
      
          return res.redirect("/admin/admin-page"); // Redirect to the admin page
        }
      }
      
    } catch (err) {
      console.log("Error", err); // Log any errors that occur
      return;
      }
      };
      
      // View all employees
      module.exports.viewEmployees = async function (req, res) {
      try {
      if (req.isAuthenticated()) { // Check if the user is authenticated
      if (req.user.isAdmin) { // Check if the user is an admin
      let employees = await User.find({}); // Find all employees in the database
      
      
          if (employees) { // If employees are found, render the employee view with the employee data
            return res.render("employee", {
              title: "ERS | Employee",
              employees: employees,
            });
          }
        } else {
          console.log("User is not authorized to view list of employees"); // Log an error if the user is not authorized to view employees
          return res.redirect("/");
        }
      } else {
        console.log("User not authenticated"); // Log an error if the user is not authenticated
        return res.redirect("/users/login");
      }
      } catch (err) {
      console.log("Error", err); // Log any errors that occur
      return;
      }
      };
      
      // Delete an employee
      module.exports.deleteEmployee = async function (req, res) {
      try {
      if (req.isAuthenticated()) { // Check if the user is authenticated
      if (req.user.isAdmin) { // Check if the user is an admin
      await User.deleteOne({ _id: req.params.id }); // Delete the employee from the database using their ID
      return res.redirect("/admin/view-employees"); // Redirect to the employee list view
      }
      }
      } catch (err) {
      console.log("Error", err); // Log any errors that occur
      return;
      }
      };

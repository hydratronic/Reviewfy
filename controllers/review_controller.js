// Importing the User and Review models
const User = require("../models/users");
const Review = require("../models/review");

// Creating a review for a user
module.exports.createReview = async function (req, res) {
  try {
    // Finding the recipient user by their ID
    let recipient = await User.findById(req.params.id);

    // If recipient is not found, redirect to home page
    if (!recipient) {
      console.log("Recipient is not valid");
      return res.redirect("/");
    }

    // Loop through the from array of the recipient to check if the user has already given a review
    for (let i = 0; i < recipient.from.length; i++) {
      // Check if the user is authenticated
      if (req.user) {
        // If the user has already given a review, create a new review and redirect to home page
        if (recipient.from[i] == req.user.id) {
          const new_review = Review.create({
            to: recipient.id,
            from: req.user.id,
            review: req.query.newReview,
          });

          // If review is not created, log an error message
          if (!new_review) {
            console.log("Review is not created");
          }

          return res.redirect("/");
        }
      } else {
        console.log("user is not loggin");
        return res.redirect("/user/login");
      }
    }
    // If user has not given a review yet, redirect to home page
    return res.redirect("/");
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

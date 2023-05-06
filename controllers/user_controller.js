const User = require("../models/users");
const Review = require("../models/review");

// Function to create a new user
module.exports.createUser = async function (req, res) {
try {
// Checking if passwords match
if (req.body.password != req.body.password2) {
console.log("password did not match");
return res.redirect("/users/register");
}


// Checking if user already exists with the provided email
let user = await User.findOne({ email: req.body.email });

if (user) {
  console.log("user already exist");
  return res.redirect("/users/register");
} else {
  // Creating new user with provided details and assigning isAdmin as true by default
  await User.create({
    name: req.body.name,
    email: req.body.email,
    isAdmin: true,
    password: req.body.password,
  });
  console.log("User created successfully");
  // Redirecting user to home page if the user is admin
  if (req.user.isAdmin) {
    return res.redirect("/");
  }
  // Redirecting user to login page if user is not admin
  return res.redirect("/users/login");
}
} catch (error) {
console.log("error while creating user", error);
return res.redirect("/users/register");
}
};

// Function to create session
module.exports.createSession = function (req, res) {
return res.redirect("/");
};

// Function to destroy session
module.exports.destroySession = function (req, res) {
req.logout(() => {
console.log("Logged Out");
return res.redirect("/users/login");
});
};

// Function to render login page
module.exports.login = function (req, res) {
// If user is already authenticated, redirect to home page
if (req.isAuthenticated()) {
return res.render("home", {
title: "ERS | Home",
});
}
// Rendering login page if user is not authenticated
return res.render("login", {
title: "ERS | Login",
});
};

// Function to render register page
module.exports.register = function (req, res) {
// If user is authenticated and admin, render addUser page
if (req.isAuthenticated() && req.user.isAdmin) {
return res.render("addUser", {
title: "ERS | Add User",
});
}

// If user is authenticated, redirect to home page
if (req.isAuthenticated()) {
return res.render("home", {
title: "ERS | Home",
});
}

// Rendering register page if user is not authenticated
return res.render("register", {
title: "ERS | Register",
});
};

// Function to render home page
module.exports.home = async function (req, res) {
try {
// Redirecting to login page if user is not authenticated
if (!req.isAuthenticated()) {
console.log("not logged in");
return res.redirect("/users/login");
}


// Finding user and their reviews
let user = await User.findById(req.user.id);
let review = await Review.find({ to: req.user.id });

let recipients = [];

// Finding all recipients for the user
for (let i = 0; i < user.to.length; i++) {
  let x = await User.findById(user.to[i]);
  recipients.push(x);
}

// Finding all reviews for the user
let reviews = [];

for (let i = 0; i < review.length; i++) {
  let x = await User.findById(review[i].from);

      let curr_review = {
        name: x.name,
        review: review[i].review,
        updated: review[i].updatedAt,
      };
      reviews.push(curr_review);
    }

    return res.render("home", {
      title: "ERS | Home",
      recipients: recipients,
      reviews: reviews,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

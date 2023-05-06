// Require the passport module
const passport = require('passport');

// Require the LocalStrategy module for passport authentication
const LocalStrategy = require('passport-local').Strategy;

// Require the User model for finding and authenticating users
const User = require('../models/users');

// Configure passport to use the LocalStrategy for authentication
passport.use(new LocalStrategy({
    usernameField : 'email', // use the email field as the username field
},
function(email, password, done) {
    // find the user by their email address and compare the password
    User.findOne({ email: email })
        .then(user => {
            if (!user || user.password != password) { // return false if the user isn't found or the password is incorrect
                console.log('Invalid user name or password');
                return done(null, false); 
            }
            
            return done(null, user); // return the user object if the authentication is successful
        })
        .catch(err => {
            console.log('Error while finding user in passport:', err);
            return done(err); // return an error if there's a problem
        });
}
));

// Serialize the user object into the session cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserialize the user object from the session cookie
passport.deserializeUser(function(id, done){
    User.findById(id).then(user => {
        if (!user) {
            return done(null, false);
        }
        return done(null, user); // return the user object if it's found
    }).catch(err => {
        console.log("Error while finding user in deseralizing:", err);
        return done(err);
    });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){ // if the user is authenticated, pass the request to the next middleware
        return next();
    }
    return res.redirect('/users/login'); // if the user isn't authenticated, redirect them to the login page
}

// Middleware to set the authenticated user object to the res.locals object
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user; // set the user object to the res.locals object if the user is authenticated
    }
    next();
}

// Export the passport object for use in other modules
module.exports = passport;

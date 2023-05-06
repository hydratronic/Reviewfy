// Require the Mongoose module
const mongoose = require('mongoose');

// Connect to the MongoDB Atlas cluster using the URI provided by Atlas
mongoose.connect('mongodb+srv://farukahmed997:123654789@cluster0.ebn7lm1.mongodb.net/?retryWrites=true&w=majority');

// Acquire the default connection if it's successful
const db = mongoose.connection;

// Log an error if the connection to the database fails
db.on('error', console.error.bind(console, 'Error connecting to database'));

// Log a success message once the connection is open
db.once('open', function() {
  console.log("Successfully connected to database!");
});

// Export the database connection object for use in other modules
module.exports = db;

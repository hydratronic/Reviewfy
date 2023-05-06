// Importing mongoose for creating the schema and model
const mongoose = require('mongoose');

// Creating a user schema with the required fields
const userSchema = new mongoose.Schema({

    // User name
    name : {
        type : String,
        required : true,
    },
    // User email
    email : {
        type : String,
        required : true,
    },
    // User password
    password : {
        type : String,
        required : true,
    },
    // Admin or not
    isAdmin : {
        type : Boolean,
        required : true,
    },
    // Array of users who this user has to review
    to : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ],
    // Array of reviews that this user has received from other users
    from : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review',
        }
    ]

},{
    // Adding timestamps to the schema
    timestamps : true,
});

// Creating a User model from the userSchema
const User = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = User;

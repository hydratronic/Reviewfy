
# Reviewfy

Reviewfy is an Employee Feedback App where employees can give feedback to each other and an admin can manage the employees and their performance reviews. The app is built using Node.js, Express, MongoDB, EJS, HTML, and CSS.



## Features

### Admin View

- Add, remove, update, and view employees
- Add, update, and view performance reviews
- Assign employees to participate in another employee's performance review

### Employee View

- List of performance reviews requiring feedback
- Submit feedback

## Authentication

- Login
- Register

## Tech Stack Used

- Node.js
- Express
- MongoDB
- EJS
- HTML
- CSS

## How to Set up the Project

1. Clone the project using the following command: git clone https://github.com/hydratronic/Reviewfy.git

2. Install npm if it is not already installed.

3. Navigate to the project directory using the following command:

cd Reviewfy

4. Install the dependencies by running the following command: npm install

5. Create an admin user by opening the userController.js file and setting the isAdmin property to true.

6. Start the server by running the following command:nodemon index.js


7. Sign up for an account and login. Once logged in, create more employees by setting their isAdmin property to false.

## Directory Structure

The project has the following directory structure:

- assets/css - contains all the CSS code
- assets/img - contains the images
- config - contains the MongoDB Atlas configuration
- controllers - contains the controllers for managing users and reviews
- models - contains the Mongoose models for users and reviews
- routes - contains the routes for the app
- views - contains the EJS templates for rendering HTML pages
- index.js - the entry point of the app


## Deployment

Reviewfy can be deployed on platforms such as render.

## Contributing

Contributions to Reviewfy are always welcome. Please read the [contribution guidelines](CONTRIBUTING.md) for details.

## License

Reviewfy is licensed under the [MIT License](LICENSE).

## Conclusion

Reviewfy is a great project for managing employee feedback. It provides a simple and efficient way for employees to give feedback to each other and for an admin to manage their performance reviews.








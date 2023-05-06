const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review_controller");

// This route is used for creating a new review, where ":id" represents the ID of the user being reviewed.
router.get("/newReview/:id", reviewController.createReview);

module.exports = router;

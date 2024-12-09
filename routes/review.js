const express = require("express");
const wrapAsync= require("../utils/wrapAsync.js");
const router =express.Router({mergeParams:true});
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

// Review create route
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

  // Review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;  
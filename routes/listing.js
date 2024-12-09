const express = require("express");
const wrapAsync= require("../utils/wrapAsync.js");
const listingController =require("../controllers/listings.js");

const router =express.Router();
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const multer =require("multer");
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/new",isLoggedIn,listingController.newForm);

router.get("/search",listingController.searchListings);

router.get("/filter",listingController.filterListings);

router
     .route("/")
     .get(wrapAsync(listingController.index))
     .post(isLoggedIn,upload.single("details[image]"), validateListing ,wrapAsync(listingController.createListing)
     );

router
    .route("/:id") 
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("details[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editForm));



module.exports = router;
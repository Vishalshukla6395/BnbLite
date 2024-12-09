const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await listing.find();
  res.render("listings/index", { allListings });
};

module.exports.newForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let Listing = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!Listing) {
    req.flash("error", "Listing you are looking for does not exist");
    res.redirect("/listings");
  } else {
    res.render("listings/show", { Listing });
  }
};

module.exports.createListing = async (req, res, next) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.details.location,
    limit: 2
  })
    .send()

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new listing(req.body.details);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry=response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "Listing Created!");
  res.redirect("/listings");
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  if (!Listing) {
    req.flash("error", "Listing you are looking for does not exist");
    res.redirect("/listings");
  }
  let originalImageUrl = Listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { Listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let Listing = await listing.findByIdAndUpdate(id, { ...req.body.details });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = { url, filename };
    await Listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
  const { query, minPrice, maxPrice } = req.query;

  if (!query) {
    req.flash("error", "Please provide a search term.");
    return res.redirect("/listings");
  }

  try {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;

    const searchQuery = query.toString();

    const mongoQuery = {
      $and: [
        {
          $or: [
            { location: { $regex: searchQuery, $options: "i" } },
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { country: { $regex: searchQuery, $options: "i" } },
          ],
        },
        { price: { $gte: min, $lte: max } },
      ],
    };

    const allListings = await listing.find(mongoQuery);

    if (allListings && allListings.length > 0) {
      res.render("listings/index.ejs", {
        allListings,
        successMessage: `Great! We found ${allListings.length} properties based on your search.`,
      });
    } else {
      req.flash(
        "error",
        "No results found. You can try with different keywords or visit listings given below."
      );
      res.redirect("/listings");
    }
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).send("An error occurred while fetching listings.");
  }
};

module.exports.filterListings = async (req, res) => {
  const { category } = req.query;

  try {
    if (!category) {
      req.flash("error", "Please select a category.");
      return res.redirect("/listings");
    }

    if (category == "all") {
      return res.redirect("/listings");
    }

    const mongoQuery = {
      $or: [
        { title: { $regex: category, $options: "i" } },
        { description: { $regex: category, $options: "i" } },
        { location: { $regex: category, $options: "i" } },
        { country: { $regex: category, $options: "i" } },
      ],
    };

    const filteredListings = await listing.find(mongoQuery);

    if (filteredListings.length > 0) {
      res.render("listings/index.ejs", { allListings: filteredListings });
    } else {
      req.flash(
        "error",
        `No listings found. You can try other categories or visit listings given below.`
      );
      res.redirect("/listings");
    }
  } catch (err) {
    console.error("Error fetching filtered listings:", err);
    res.status(500).send("An error occurred while fetching listings.");
  }
};

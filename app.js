if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash =require("connect-flash");
const passport =require("passport");
const LocalStrategy =require("passport-local");
const User =require("./models/user.js");
const listing = require("./models/listing.js");

const listingRoutes=require("./routes/listing.js");
const reviewRoutes=require("./routes/review.js");
const userRoutes=require("./routes/user.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

const dbUrl =process.env.ATLASDB_URL;

const store =MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error",()=>{
  console.log("ERROR IN MONGO SESSION STORE",err);
});

const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});



main()
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);    
};

app.use("/listings",listingRoutes);
app.use("/listings/:id/reviews",reviewRoutes);
app.use("/",userRoutes);

app.get('/search', async (req, res) => {

  try {
    const { query, minPrice, maxPrice } = req.query;
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;
  
    const searchQuery = query ? query.toString() : "";
  
    const mongoQuery = {
      $and: [
        {
          $or: [
            { location: { $regex: searchQuery, $options: 'i' } },
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
            { country: { $regex: searchQuery, $options: 'i' } },
          ],
        },
        { price: { $gte: min, $lte: max } },
      ],
    };
    const allListings = await listing.find(mongoQuery);
   
    if (allListings && allListings.length > 0) {
      const numberOfResults = allListings.length;
      req.flash("success", `Great! We found ${numberOfResults} properties based on your search.`);
      res.render("listings/index.ejs", { allListings });
    } else {
      req.flash("error", "No results found. Please try again with different keywords.");
      res.redirect("/search");
    }
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).send("An error occurred while fetching listings.");
  }
  
});

// 404 route handler
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"))
});

// Global error handler
app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong!"}=err;
   res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080, () => {
  console.log("Server is listening on port : 8080");
});

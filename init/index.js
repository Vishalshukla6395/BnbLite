const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing");

let Mongo_url="mongodb://127.0.0.1:27017/bnbLite";

main()
  .then(() => console.log("initializing DB..."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_url);
}

let initDB = async ()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6740b88c972d9990254623d8"}));
    await listing.insertMany(initData.data);
    console.log("Database has been initialized.");
}

initDB();
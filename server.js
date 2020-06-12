const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const logger = require("morgan");
// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
let db = require("./models");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Initialize Express
let app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// Make public a static folder
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
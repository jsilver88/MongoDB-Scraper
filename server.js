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

const router = express.Router();
// Require routes file
require("./routes/routes")(router);

// Initialize Express
let app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// Make public a static folder
app.use(express.static(__dirname + "/public"));

app.use(router);

// Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("mongoose connection is successful.");
    }
});

// Connect Handlebars to express
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
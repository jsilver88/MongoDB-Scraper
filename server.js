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
app.use(express.static(__dirname + "/public"));

// Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("mongoose connection is successful.");
    }
});

// Get articles from the db
app.get("/", function (req, res) {
    db.Article.find({
        saved: false
    },
        function (err, dbArticle) {
            if (err) {
                console.log(err);
            } else {
                res.render("home", {
                    articles: dbArticle
                });
            }
        })
})

// Get route for scraping the website
app.get("/scrape", function (req, res) {
    axios.get("https://techcrunch.com/", function (response) {
        let $ = cheerio.load(response.data);
        $("div.post-block").each(function (i, element) {
            let title = $(element).find("a.post-block__title__link").text().trim();
            let url = $(element).find("a.post-block__title__link").attr("href");
            let description = $(element).children(".post-block__content").text().trim();

            if (title && url && description) {
                db.Article.create({
                    title: title,
                    url: url,
                    description: description
                }).then(function (dbArticle) {
                    res.send(dbArticle);
                }).catch(function (err) {
                    res.json(err);
                })
            }
        })
    })
});

// Get route for saved articles
app.get("/saved", function (req, res) {
    db.Article.find({
        saved: true
    }).then(function (dbArticle) {
        res.render("saved", {
            articles: dbArticle
        })
    }).catch(function (err) {
        res.json(err);
    })
});


// Connect Handlebars to express
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    comments: [{
        type: Schema.ObjectId,
        ref: "Comment"
    }]
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
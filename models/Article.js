const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
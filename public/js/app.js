$(document).ready(function () {
    let articles = $(".article-container");

    $(".save-button").on("click", function (e) {
        let savedNews = $(this).data();
        savedNews.saved = true;

        let id = $(this).attr("data-articleId");
        $.ajax("/saved/" + id, {
            method: "PUT",
            data: savedNews
        }).then(function (data) {
            location.reload();
        })
    })

    $(".scrape-button").on("click", function (e) {
        e.preventDefault();
        $.get("/scrape", function (data) {
            window.location.reload();
        })
    })

    function commentModal(comment) {
        let text = comment.title;
        $("#comment-title").text("Comment on " + text);
        let commentSection;
        let deleteButton;
        for (let i = 0; i < comment.comments.length; i++) {
            commentSection = $("<li>").text(comment.comments[i].body);
            commentSection.addClass("comment-list");
            commentSection.attr("id", comment.comments[i]._id);

            deleteButton = $("<button> Delete </button>").addClass("btn btn-danger delete-comment");
            deleteButton.attr("data-commentId", comment.comments[i]._id);
            commentSection.prepend(deleteButton, "");
            $(".comments-list").append(commentSection);
        }
    }

    $(".comment-modal-button").on("click", function (e) {
        let articleId = $(this).attr("data-articleId");
        $("#commentModal").attr("data-articleId", articleId);
        $("#comment-title").empty();
        $("comments-list").empty();
        $("#commentsBox").val("");

        $.ajax("/comments/article/" + articleId, {
            method: "GET"
        }).then(function (data) {
            commentModal(data);
        })

        $("#commentModal").modal("toggle");
    });

    $(".comment-button").on("click", function (e) {
        e.preventDefault();
        let thisId = $("#commentModal").attr("data-articleId");
        let newComment = {
            body: $("#commentsBox").val().trim()
        }

        $.ajax("/submit/" + thisId, {
            method: "POST",
            data: newComment
        }).then(function (data) {
            console.log(data);
        })
    })
});
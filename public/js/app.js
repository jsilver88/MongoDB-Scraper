$(document).ready(function () {
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
});
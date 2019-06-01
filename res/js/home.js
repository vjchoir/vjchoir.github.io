console.log("Loading home.js...");

var homeJSON = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/home.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var updateJSON = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/updatelog.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();


$(document).ready(function() {
    initContent();
});

function initContent() {
    $("#home-header-logo").attr("src", homeJSON.header_photo);
    if(localStorage.getItem("vjchoir.isDarkMode") == "true") {
        $("#home-header-logo").css("filter", "invert(0%)");
    }
        
    $("#home-header-intro-msg").html(homeJSON.intro_msg);
    $("#home-header-creator-msg").html(homeJSON.creator_msg);

    initCarousel();
    
}

function initCarousel() {
    $("#home-carousel").carousel({
        interval: 8000
    });

    let currCarouselItem = 1;
    $("#home-carousel-counter").html(currCarouselItem + " / " + homeJSON.carousel_photos.length);
    $("#home-carousel").on("slid.bs.carousel", function(event) {
        if(event.direction == "left") currCarouselItem ++;
        else currCarouselItem --;

        if(currCarouselItem <= 0) currCarouselItem = homeJSON.carousel_photos.length;
        else if(currCarouselItem > homeJSON.carousel_photos.length) currCarouselItem = 1;

        $("#home-carousel-counter").html(currCarouselItem + " / " + homeJSON.carousel_photos.length);

        
    });

    let counter = 0;
    for(let item of homeJSON.carousel_photos) {
        let itemHTML = `<div class="carousel-item text-center">
                <img src="${item}">
        </div>`

        if(counter == 0) {
            itemHTML = `<div class="carousel-item active text-center">
                <img src="${item}">
            </div>`
        }
        
        $("#home-carousel-holder").append(itemHTML);
        counter ++;
    }
}
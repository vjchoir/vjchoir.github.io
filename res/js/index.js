console.log("Loading index.js...");

$(document).ready(function () {
    $(".sidebar-holder").load("/sidebar.html");
    $(".navbar-holder").load("/navbar.html");
    $(".footer-holder").load("/footer.html");

    initNav();
});

function initNav() {

    
}

function reloadAnim() {
    $(".content-holder").fadeIn(500);
}

function setURL(url) {
    window.history.pushState("data","Title", url);
}

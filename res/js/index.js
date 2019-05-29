console.log("Loading index.js...");

$(document).ready(function () {
    $(".sidebar-holder").load("/sidebar.html");
    $(".navbar-holder").load("/navbar.html");
    $(".footer-holder").load("/footer.html");

    initNav();
});

function initNav() {

    // Handling the open close sidebar button
    $(".navbar-holder").on("click", "#sidebarCollapse", function () {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("active");
        
        $(".collapse.in").toggleClass("in");
        
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
}

function reloadAnim() {
    $(".content-holder").fadeIn(500);
}

function setURL(url) {
    window.history.pushState("data","Title", url);
}

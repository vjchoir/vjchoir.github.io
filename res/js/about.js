console.log("Loading about.js...");

var aboutJSON = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/about.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var aboutButtonIds = [];
var aboutContentDivIds = [];

var currNav, currDiv;

$(document).ready(function(){
    for(let item of aboutJSON) {

        // handling the buttons
        let buttonId = `about-${item.id}-button`;
        let buttonHTML = `<button id="${buttonId}" class="nav-button">${item.title}</button>`
        aboutButtonIds.push(buttonId);

        $("#about-buttons-holder").append(buttonHTML);

        // handling the content
        let contentId = `about-${item.id}-div`;
        let contentHTML = `<div id="${contentId}" class="actual-content">
            <h2>${item.title}</h2>
            <img src="${item.img}" class="about-img">
            <p id="${contentId}-text">${item.text}</p>
        </div>`;

        // handling conductor
        if(contentHTML.includes("mrkwei")) {
            contentHTML = `<div id="${contentId}" class="about-actual-content">
                <h2>${item.title}</h2>
                <img src="${item.img}" class="about-img" style="max-width: 250px;">
                <p id="${contentId}-text">${item.text}</p>
            </div>`;
        }

        $("#about-content").append(contentHTML);

        $("#" + contentId).hide();
        aboutContentDivIds.push(contentId);

        // handling button clicks
        $("#" + buttonId).click(function() {
            if(buttonId != currNav) {
                navClickEvent(buttonId, contentId);
            }
        });
    }

    initAbout();
}); 

function initAbout() {
    $("#" + aboutButtonIds[0]).addClass("nav-button-active");
    toggleVisibility(aboutContentDivIds[0]);

    currNav = aboutButtonIds[0];
    currDiv = aboutContentDivIds[0];
}

function navClickEvent(buttonId, divId) {
    $("#" + currNav).removeClass("nav-button-active");
    toggleVisibility(currDiv);

    $("#" + buttonId).addClass("nav-button-active");
    toggleVisibility(divId);

    currNav = buttonId;
    currDiv = divId;
}

function toggleVisibility(div) {
    if($("#" + div).is(":visible")) {
        $("#" + div).fadeOut(200);
    } else {
        $("#" + div).fadeIn(200);
    }
}
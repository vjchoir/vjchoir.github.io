var changelogJSON = (function() {
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

var currNav = null;

$(document).ready(function() {
    let index = 0;
    for(let changelog of changelogJSON) {
        let clButton = `<button id="misc-cl-button-${index}"class="nav-button" onclick="changelogButtonClick(${index})">${changelog.date}</button>`;

        $("#misc-changelog-button-holder").append(clButton);
        index ++;
    }

    changelogButtonClick(0);
});

function changelogButtonClick(index) {
    $("#misc-changelog-list").empty();
    $("#misc-changelog-title").text(changelogJSON[index].title);
    for(let item of changelogJSON[index].items) {
        let itemHTML = `<li><p>${item}</p></li>`
        $("#misc-changelog-list").append(itemHTML);            
    }

    setActiveButton(`misc-cl-button-${index}`);
}

function setActiveButton(buttonId) {
    $("#" + currNav).removeClass("nav-button-active");
    $("#" + buttonId).addClass("nav-button-active");
    currNav = buttonId;
}
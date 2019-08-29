console.log("Loading sov.js...");

var sovJSON = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/sov.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var currNav, currDiv;
var sovButtonIds = [];

$(document).ready(function() {
    initSOV();
});

function initSOV() {
    $("#sov-item").hide();

    let sovCount = 0;
    for(let sov of sovJSON) {
        if(sovCount == 0) {
            sovCount ++;
            continue;
        }    
        sovCount ++;
        let temp = sovCount;
        let tempHTML = `<div id="sov-${sovCount}" class="batch-home-batch">
                    <img src="${sov.album_art}">
                    <h4>${sov.abbr}</h4>
        </div>`

        if(sovCount % 2 == 0) {
            tempHTML += `<div class="vertical-line"></div>`;
        }

        $("#sov-home-sovs").append(tempHTML);

        $("#sov-" + sovCount).click(function() {
            navClickEvent(sovButtonIds[temp - 2], sov);
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // adding home button to button holder
    let buttonHTML = `<button id="sov-home-button" class="nav-button">Main</button>`
    $("#sov-buttons-holder").append(buttonHTML);

    $("#sov-home-button").addClass("nav-button-active");

    currNav = "sov-home-button";
    currDiv = "sov-home";

    $("#sov-home-button").click(function() {
        if(!$("#sov-home").is(":visible")) {
            setActiveButton("sov-home-button");

            setVisible("sov-home");

            currNav = "sov-home-button";

            document.title = "Symphony of Voices";
        }
    });

    // adding buttons to button holder
    let sovIndex = 0;
    for(let sov of sovJSON) {
        if(sovIndex == 0) {
            sovIndex ++;
            continue;
        }    
        // handling the buttons
        let buttonId = "sov-" + sovIndex + "-button";
        let buttonHTML = `<button id="${buttonId}" class="nav-button">${sov.abbr}</button>`

        $("#sov-buttons-holder").append(buttonHTML);

        $("#" + buttonId).click(function() {
            navClickEvent(buttonId, sov);
        });

        sovIndex ++;
        sovButtonIds.push(buttonId);
    }
}

function navClickEvent(buttonId, sovItem) {
    resetDivs();
    setActiveButton(buttonId);

    document.title = sovItem.abbr;
    
    setVisible("sov-item");

    setTimeout(function() {
        loadSOV(sovItem);
    }, 200);
}

function loadSOV(sov) {

    // adding things to the header
    $("#sov-title").html(sov.title);
    $("#sov-album-art").attr("src", sov.album_art);
    $("#sov-intro").html(sov.intro);

    // repertoire handling
    let repertoire = sov.repertoire;
    $("#sov-repertoire-firsthalf").append("<h4>First Half</h4>");
    for(let song of repertoire.first_half) {
        let songHTML = `<div class="sov-song">
            <p class="sov-song-title">${song.name}</p>
            <p class="sov-song-composer">by ${song.composer}</p>
        </div>`;

        $("#sov-repertoire-firsthalf").append(songHTML);
    }

    $("#sov-repertoire-secondhalf").append("<h4>Second Half</h4>");
    for(let song of repertoire.second_half) {
        let songHTML = `<div class="sov-song">
            <p class="sov-song-title">${song.name}</p>
            <p class="sov-song-composer">by ${song.composer}</p>
        </div>`;

        $("#sov-repertoire-secondhalf").append(songHTML);
    }

    // youtube handling
    let ytHTML = `<iframe src="${sov.links.yt.link}" id="sov-youtube" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    if(`${sov.links.yt.link}`.includes("youtube")) {
        $("#sov-youtube").html(ytHTML);
        $("#sov-youtube-link").attr("href", `${sov.links.yt.link}`);

        $("#sov-youtube").show();
    } else {
        $("#sov-youtube").hide();
        $("#sov-youtube-link").hide();
    }
    $("#sov-youtube-desc").html(`${sov.links.yt.desc}`);
    

    // downloads handling
    let dls = sov.links.dls;
    $("#sov-downloads-intro").html(dls.intro);
    let dlWidth = 100 / dls.sections.length;
    let dlCount = 0;
    for(let dlItem of dls.sections) {
        dlCount ++;
        let dlTitleLowercase = dlItem.title.toLowerCase();

        let dlHTML = `<div id="sov-download-section-${dlTitleLowercase}"class="sov-download-section">
            <h4>${dlItem.title}</h4>
            <div id="sov-download-${dlTitleLowercase}">
            
            </div>
            <p>${dlItem.desc}</p>
        </div>`

        $("#sov-downloads").append(dlHTML);

        $("#sov-download-section-" + dlItem.title.toLowerCase()).css("width", dlWidth + "%");

        for(let link of dlItem.links) {
            let linkHTML = `<a href="${link.link}" target="_blank" class="sov-button">
                <i class="material-icons">${link.icon}</i>
                <span class="main-text">${link.title}</span>
                <span class="sub-text">${link.size}</span>
            </a>`

            $("#sov-download-" + dlItem.title.toLowerCase()).append(linkHTML);
        }
        
        if(dlCount != dls.sections.length) {
            $("#sov-downloads").append(`<div class="vertical-line"></div>`);
        }
    }

}

function resetDivs() {
    $("#sov-repertoire-firsthalf").empty();
    $("#sov-repertoire-secondhalf").empty();
    $("#sov-downloads").empty();

}

function setVisible(div) {
    $("#" + currDiv).fadeOut(200);
    $("#" + div).fadeIn(200);

    currDiv = div;
}

function setActiveButton(buttonId) {
    $("#" + currNav).removeClass("nav-button-active");
    $("#" + buttonId).addClass("nav-button-active");
    currNav = buttonId;
}
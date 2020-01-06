console.log("Loading batches.js...");

var batchesJSON = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/batches.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var batchesButtonIds = [];
var currNav, currDiv;

$(document).ready(function () {
    initBatches();
});

function initBatches() {

    $("#batch-item").hide();

    // adding home button to button holder
    let buttonHTML = `<button id="batch-home-button" class="nav-button">Main</button>`
    $("#batch-buttons-holder").append(buttonHTML);

    $("#batch-home-button").addClass("nav-button-active");

    currNav = "batch-home-button";
    currDiv = "batch-home";

    $("#batch-home-button").click(function () {
        if (!$("#batch-home").is(":visible")) {
            setActiveButton("batch-home-button");

            setVisible("batch-home");

            currNav = "batch-home-button";
            document.title = "Batches";
        }
    });

    // adding the buttons to the button holder
    let batchIndex = 0;
    for (let batch of batchesJSON.batches_info) {
        // handling the buttons
        let buttonId = "batch-" + batchIndex + "-button";
        let buttonHTML = `<button id="${buttonId}" class="nav-button">${batch.batch_name}</button>`

        $("#batch-buttons-holder").append(buttonHTML);

        $("#" + buttonId).click(function () {
            navClickEvent(buttonId, batch);
        });

        batchIndex++;
        batchesButtonIds.push(buttonId);
    }

    $("#batch-home-text").html(batchesJSON.batches_msg);

    let batchCount = 0;
    for (let batch of batchesJSON.batches_info) {
        batchCount++;
        let temp = batchCount;
        let batchHTML = `<div id="batch-${batchCount}"class="batch-home-batch">
                    <img src="${batch.batch_img}">
                    <h4>Batch of ${batch.batch_name}</h4>
        </div>`

        if (batchCount % 2 > 0) {
            batchHTML += `<div class="vertical-line"></div>`;
        }

        $("#batch-home-batches").append(batchHTML);

        $("#batch-" + batchCount).click(function () {
            navClickEvent(batchesButtonIds[temp - 1], batch);
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function navClickEvent(buttonId, batchItem) {
    setActiveButton(buttonId);

    setVisible("batch-item");

    document.title = `Batch of ${batchItem.batch_name}`;

    setTimeout(function () {
        loadBatch(batchItem);
    }, 200);
}

function loadBatch(batch) {
    $("#batch-title").html("Batch of " + batch.batch_name);
    $("#batch-img").attr("src", batch.batch_img);
    $("#batch-description").html(batch.batch_description);

    // handling choir committees
    let commWidth = 100 / batch.comms.length - 1;

    $("#batch-comms-holder").empty();
    let commCount = 0;
    for (let comm of batch.comms) {
        commCount++;
        let commName = comm.name.toLowerCase();

        // retrieving the committee members' names
        let commMembs = "";
        for (let i = 0; i < comm.members.length; i++) {
            if (i != comm.members.length - 1) {
                commMembs += comm.members[i] + ", ";
            } else {
                commMembs += comm.members[i];
            }
        }

        let commHTML = `<div id="comm-item-${commName}" class="batch-section">
            <h4>${comm.name}</h4>
            <img src="${comm.img}">
            <p>${commMembs}</p>
        </div>`

        if (commCount < batch.comms.length) {
            commHTML += `<div class="vertical-line"></div>`;
        }

        $("#batch-comms-holder").append(commHTML);
        $(`#comm-item-${commName}`).css("width", commWidth + "%");
    }

    // handling sections
    let sectWidth = 100 / batch.sections.length;
    let sectCount = 0;
    $("#batch-choir-sections-holder").empty();
    for (let section of batch.sections) {
        sectCount++;
        let sectName = section.section.toLowerCase();
        let sectMembs = "";

        let sectLdr = section.members[0];
        section.members.sort();
        sectMembs += sectLdr + "</br>";
        for (let i = 0; i < section.members.length; i++) {
            if (section.members[i] == sectLdr) {
                continue;
            }
            if (i != section.members.length - 1) {
                sectMembs += section.members[i] + "</br>";
            } else {
                sectMembs += section.members[i];
            }
        }

        let sectHTML = `<div id="sect-item-${sectName}"class="batch-section">
            <h4>${section.section}</h4>
            <p>${sectMembs}</p>
        </div>`

        if (sectCount < batch.sections.length) {
            sectHTML += `<div class="vertical-line"></div>`;
        }

        $("#batch-choir-sections-holder").append(sectHTML);
        $(`#sect-item-${sectName}`).css("width", sectWidth + "%");
    }

    // handling photo carousel

    if(batch.photos.length != 0) {
        $("#batch-choir-photos-holder").show();
        $("#batches-carousel").carousel({
            interval: 8000
        });
    
        let currCarouselItem = 1;
        $("#batches-carousel-counter").html(currCarouselItem + " / " + batch.photos.length);
        $("#batches-carousel").on("slid.bs.carousel", function (event) {
            if (event.direction == "left") currCarouselItem++;
            else currCarouselItem--;
    
            if (currCarouselItem <= 0) currCarouselItem = batch.photos.length;
            else if (currCarouselItem > batch.photos.length) currCarouselItem = 1;
    
            $("#batches-carousel-counter").html(currCarouselItem + " / " + batch.photos.length);
        });
        let counter = 0;
        for (let photo of batch.photos) {
            let itemHTML = `<div class="carousel-item text-center">
                        <img src="${photo}">
                </div>`
    
            if (counter == 0) {
                itemHTML = `<div class="carousel-item active text-center">
                        <img src="${photo}">
                    </div>`
            }
    
            $("#batches-carousel-holder").append(itemHTML);
            counter++;
        }
    } else {
        $("#batch-choir-photos-holder").hide();
    }
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
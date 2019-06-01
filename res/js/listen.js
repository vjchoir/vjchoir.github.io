console.log("Loading listen.js...");

// array holders
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

var listenJSON = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/listen.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
var playlists = [];
var favouritePlaylist = [];
var favouritePlaylistIds = [];

// variables for player
var currPlaylist = null;
var currPlaylistIndex = 0;
var currTrack = null;
var currSOV = null;
var currIndex = 0;
var myPlayer = null;
var isShuffle = false;
var shuffledArray = [];
var isLoading = false;


$(document).ready(function () {

    setupModals();

    makeFavouritePlaylist();
    getPlaylists();

    currPlaylist = playlists[0];

    favouritePlaylist = JSON.parse(localStorage.getItem("sov-favouritePlaylist"));
    favouritePlaylistIds = JSON.parse(localStorage.getItem("sov-favouritePlaylistIds"));
    
    

    // Checks if there is a playlist that has been saved beforehand, if not we initialise them here
    if(favouritePlaylist == null) {
        favouritePlaylist = [];
        favouritePlaylistIds = [];
    }

    // Initialising of the jPlayer and the various controls and settings 
    myPlayer = $("#jquery_jplayer_1").jPlayer({
        ready: function (event) {
            let initPlaylist = playlists[0];
            let initSOV = sovJSON[0];
            if(initPlaylist.length == 0) {
                initPlaylist = playlists[1];
                initSOV = sovJSON[1];
                currPlaylistIndex = 1;
            }

            $(this).jPlayer("setMedia", initPlaylist[0]);
            toggleLoading(true);

            // in case it's in the favourites or not
            $(".jp-np-img").attr("src", `${initSOV.album_art}`)
            
            $(".jp-title").text(`${initPlaylist[0].name}`);
            $(".jp-composer").text(`${initPlaylist[0].composer}`)
            $(".jp-current-playlist").text(`in playlist \"${initSOV.title}\"`);
            $("#" + initSOV.abbr + "-1").addClass("track-highlighted");
            $(".jp-shuffle").css("color", "var(--divider-colour");
            $(".jp-curr-count").text(`${currIndex + 1} / ${initPlaylist.length}`);

            currPlaylist = initPlaylist;
            currTrack = initSOV.abbr + "-1";
            currSOV = sovJSON[0];
        },
        swfPath: "/js/jplayer",
        supplied: "mp3, oga",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        volume: "0.5",
        seeking: function (event) {
            updatebar(event.pageX);
        },
        volumechange: function (event) {
            var currVol = event.jPlayer.options.volume;
            var isMuted = event.jPlayer.options.muted;

            if (isMuted || currVol == 0) {
                $('.jp-mute').html('<i class="material-icons">volume_off</i>');
            } else {
                $('.jp-mute').html('<i class="material-icons">volume_up</i>');
            }
        },
        ended: function (event) {
            isPlaying = false;

            // add next item in playlist
            currIndex++;

            // case where it's the last track in the playlist
            if (currIndex >= currPlaylist.length - 1) {
                myPlayer.jPlayer("setMedia", currPlaylist[0]);
                
                createToast("You've finished the current playlist!");
                currIndex = 0;
                $(".jp-curr-count").text(`${currIndex + 1} / ${currPlaylist.length}`);
                if (isShuffle) isShuffle = !isShuffle

                $("#" + currSOV.abbr + "-1").addClass("track-highlighted");
                $("#" + currTrack).removeClass("track-highlighted");
                
                $(".jp-title").text(`${currPlaylist[0].name}`);
                $(".jp-composer").text(`${currPlaylist[0].composer}`)
                setTimeout(toggleShuffle(), 10000);
            } else {
                console.log("Track ended; current index is " + currIndex);
                let val = currIndex + 1;
                let listId = currSOV.abbr + "-" + val.toString();

                // shuffle handler
                if (isShuffle) {
                    listId = currSOV.abbr + "-" + shuffledArray[currIndex];
                    trackClickEvent(listId, currPlaylistIndex, shuffledArray[currIndex] - 1, false);
                } else {
                    trackClickEvent(listId, currPlaylistIndex, currIndex, false);
                }
            }
        },
        loadeddata: function(event) {
            console.log("state: data loaded");
            toggleLoading(false);
        }
    });

    //update Progress Bar control
    var updatebar = function (x) {

        var progress = $('.jp-play-bar');
        var maxduration = $("#jquery_jplayer_1").jPlayer.duration; //audio duration
        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }

        $("#jquery_jplayer_1").jPlayer("playHead", percentage);

        //Update progress bar and video currenttime
        $('.jp-play-bar').css('width', percentage + '%');
        $("#jquery_jplayer_1").jPlayer.currentTime = maxduration * percentage / 100;
    };

    // prev button handler
    $(".jp-prev").on("click", function () {
        
        if (currIndex >= 1) {
            currIndex--;
            let val = currIndex + 1;
            let listId = currSOV.abbr + "-" + val.toString();

            // shuffle handler
            if (isShuffle) {
                listId = currSOV.abbr + "-" + shuffledArray[currIndex];
                trackClickEvent(listId, currPlaylistIndex, shuffledArray[currIndex], false);
            } else {
                trackClickEvent(listId, currPlaylistIndex, currIndex, false);
            }

            toggleLoading(true);
        }
    });

    // next button handler
    $(".jp-next").on("click", function () {
        // case where it's the last track in the playlist
        if (currIndex >= currPlaylist.length - 1) {
            myPlayer.jPlayer("setMedia", currPlaylist[0]);
            createToast("You've finished the current playlist!");
            currIndex = 0;
            $(".jp-curr-count").text(`${currIndex + 1} / ${currPlaylist.length}`);
            if (isShuffle) isShuffle = !isShuffle

            $("#" + currSOV.abbr + "-1").addClass("track-highlighted");
            $("#" + currTrack).removeClass("track-highlighted");
            currTrack = currSOV.abbr + "-1";
            
            $(".jp-title").text(`${currPlaylist[0].name}`);
            $(".jp-composer").text(`${currPlaylist[0].composer}`)
            setTimeout(toggleShuffle(), 10000);

            toggleLoading(true);
        } else {
            currIndex++;
            console.log("Track ended; current index is " + currIndex);
            let val = currIndex + 1;
            let listId = currSOV.abbr + "-" + val.toString();

            // shuffle handler
            if (isShuffle) {
                listId = currSOV.abbr + "-" + shuffledArray[currIndex];
                console.log("shuffle, index is " + shuffledArray[currIndex]);
                trackClickEvent(listId, currPlaylistIndex, shuffledArray[currIndex], false);
            } else {
                trackClickEvent(listId, currPlaylistIndex, currIndex, false);
            }

            toggleLoading(true);
        }
    });

    // play button handler 
    $(".jp-play").click(function() {
        setDocumentTitle();
    });

    $(".jp-pause").click(function() {
        setDocumentTitle("Paused...");
    });

    // stop button handler
    $(".jp-stop").on("click", function () {
        $("#" + currTrack).removeClass("track-highlighted");
        currTrack = null;
        document.title = "Listen";
    });

    // shuffle button handler
    $(".jp-shuffle").on("click", function () {
        isShuffle = !isShuffle;
        if (isShuffle) {
            for (let i = 0; i < currPlaylist.length; i++) {
                shuffledArray[i] = i;
            }

            shuffleArray(shuffledArray);

            for (let i = 0; i < shuffledArray.length; i++) {
                if (shuffledArray[i] == currIndex) {
                    let temp = shuffledArray[0];
                    shuffledArray[0] = currIndex;
                    shuffledArray[i] = temp;
                    break;
                }
            }
            console.log(shuffledArray);
            currIndex = 0;
            $(".jp-curr-count").text(`${currIndex + 1} / ${currPlaylist.length}`);
        } else {
            currIndex = shuffledArray[currIndex];
            $(".jp-curr-count").text(`${currIndex + 1} / ${currPlaylist.length}`);
        }
        toggleShuffle();
    });

    // add playlists, tracks and click events
    for (let i = 0; i < playlists.length; i ++) {
        let playlist = playlists[i];
        let sov = sovJSON[i];
        let playlistId = sov.abbr;
        let name = sov.title;
        let img = sov.album_art;
        let description = sov.intro;
        let tracksHolderId = playlistId + "-items";
        let playlistHolderId = playlistId + "-track-holder";

        // calculating runtime
        let runtimeHr = 0, runtimeMin = 0, runtimeSec = 0;
        for(let track of playlist) {
            let timeArr = track.duration.split(":");
            runtimeMin += parseInt(timeArr[0]);
            runtimeSec += parseInt(timeArr[1]);
        }

        runtimeMin += runtimeSec / 60;
        runtimeHr = runtimeMin / 60;
        runtimeMin = runtimeMin % 60;
        let runtimeStr = Math.floor(runtimeHr) + " hours and " + Math.round(runtimeMin) + " minutes";

        var playlistHTML = `<div id="${playlistId}" class="playlist-item">\
        <div class="playlist-info">\
            <img src="${img}">\
            <div class="playlist-info-text">\
                <h2>${name}</h2>\
                <div class="playlist-info-header">\
                    <button id="${playlistId}-button" onclick="togglePlaylistVisibility('${playlistHolderId}', '${playlistId}-button')" class="nav-button">Show playlist</button>
                    <button onclick="trackClickEvent('${playlistId}-1', ${i}, 0, true)" class="nav-button">Play</button>
                </div>\
                <p>This playlist contains <b id="playlist-track-count">${playlist.length} tracks</b>, with a total runtime of <b id="playlist-runtime">${runtimeStr}</b>.</p>
                <p>${description}</p>\
            </div>\
        </div>\
        <div id= "${playlistId}-track-holder" class="playlist-track-holder">\
            <div class="playlist-track playlist-header">\
                <h6 class="track-favourite">Fav.</h6>\
                <h6 class="track-number">#</h6>\
                <h6 class="track-title">Title</h6>\
                <h6 class="track-composer">Composer</h6>\
                <h6 class="track-duration">Duration</h6>\
            </div>\
            <ul id="${tracksHolderId}">\
            </ul>\
        </div>\
    </div>`

        $('.playlists-holder').append(playlistHTML);

        let counter = 1;
        for (let track of playlist) {
            let val = counter - 1;
            let listId = playlistId + "-" + counter.toString();
            let listFavId = playlistId + "-" + counter.toString() + "-fav";
            let favIcon = "favorite_border";

            if(favouritePlaylistIds.includes(listId)) {
                favIcon = "favorite";
                console.log(track.name + " in favourites!");
            }

            let trackHTML = `
            <li id="${listId}" onclick="trackClickEvent('${listId}', ${i}, ${val}, true)">
                <div class="playlist-track">
                <button id="${listFavId}" class="track-favourite")"><i
                class="material-icons-round">${favIcon}</i></button>
                    <p class="track-number">${counter}</p>
                    <p class="track-title">${track.name}</p>
                    <p class="track-composer">${track.composer}</p>
                    <p class="track-duration">${track.duration}</p>
                </div>
            </li>`;
            $("#" + tracksHolderId).append(trackHTML);
            counter++;

            $("#" + listFavId).click(function(event) {
                event.stopPropagation();
                
                if(!favouritePlaylistIds.includes(listId)) {
                    addToFavourites(listId, track);
                    $("#" + listFavId).html('<i class="material-icons-round">favorite</i>');
                } else {
                    removeFromFavourites(listId, track);
                }    
            });

            track.id = listId;
        }

        $('#' + playlistHolderId).css("display", "none");

        let line = '<div class="line"></div>';
        if(i != playlists.length - 1) {
            $('.playlists-holder').append(line);
        }
    }

    myPlayer.on("canplay", function(event) {
        console.log("We can probably play through this!");
    });

    // favourites playlist handler
    initFavPlaylist();
});

function setupModals() {
    // When the user clicks the button, open the modal 
    $("#listen-help-button").click(function(){
        $(".modal-content").html(listenJSON.help);
        $("#myModal").fadeIn(200);

        $(".close").click(function(){
            $("#myModal").fadeOut(200);
        });
    });

    $("#listen-how-button").click(function(){
        $(".modal-content").html(listenJSON.how);
        $("#myModal").fadeIn(200);

        $(".close").click(function(){
            $("#myModal").fadeOut(200);
        });
    });

    $("#listen-reset-button").click(function(){
        $(".modal-content").html(listenJSON.reset);
        $("#myModal").fadeIn(200);

        $("#listen-reset").click(function() {
            resetFavouritesPlaylist();
            $("#myModal").fadeOut(200);
        })

        $(".close").click(function(){
            $("#myModal").fadeOut(200);
        });
    });


    // When the user clicks on <span> (x), close the modal
    

    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function(event) {
        if (event.target == $("#myModal")) {
            $("#myModal").fadeOut(200);
        }
    });
}

function makeFavouritePlaylist() {
    sovJSON[0].repertoire.first_half = favouritePlaylist;
}

// Retrieves the playlists from each SOV item
function getPlaylists() {

    for(let sov of sovJSON) {
        let thisSOV = sov.repertoire.first_half.concat(sov.repertoire.second_half);
        for(let song of thisSOV) {
            song.mp3 = `/assets/audio/${sov.abbr}/${song.mp3}.mp3`;
        }
        console.log("Created playlist for " + sov.title + ", pushing " + thisSOV.length + " songs");        
        playlists.push(thisSOV);
    }
}

// Handles the clicking event on a track item
function trackClickEvent(listId, playlistIndex, id, isClick) {
    if (isClick) currIndex = id;
    if (playlistIndex != null) {
        currPlaylist = playlists[playlistIndex];
        currPlaylistIndex = playlistIndex;
    }
    if (listId != currTrack) {
        $("#" + listId).addClass("track-highlighted");
        $("#" + currTrack).removeClass("track-highlighted");
        
        currTrack = listId;
    }

    currSOV = sovJSON[playlistIndex];

    $(".jp-np-img").attr("src", `${currSOV.album_art}`);
    $(".jp-title").text(`${currPlaylist[id].name}`);
    $(".jp-composer").text(`${currPlaylist[id].composer}`)
    $(".jp-current-playlist").text(`in playlist "${currSOV.title}"`);
    $(".jp-curr-count").text(`${currIndex + 1} / ${currPlaylist.length}`);
    myPlayer.jPlayer("setMedia", currPlaylist[id]);
    myPlayer.jPlayer("play");

    setDocumentTitle();

    toggleLoading(true);
}

// Toggles the visibility of the playlist
function togglePlaylistVisibility(playlistId, buttonId) {
    if ($("#" + playlistId).is(":hidden")) {
        $("#" + playlistId).fadeIn(200);
        $("#" + buttonId).text("Hide playlist");

    } else {
        $("#" + playlistId).fadeOut(200);
        $("#" + buttonId).text("Show playlist");
    }
}

function setDocumentTitle(text) {
    if(text == null) {
        if(currSOV.abbr == "fav") {
            document.title = `Favourites - ${currPlaylist[currIndex].name}`;
        } else {
            document.title = `${currSOV.abbr} - ${currPlaylist[currIndex].name}`;
        }
    } else {
        if(currSOV.abbr == "fav") {
            document.title = `Favourites - ${text}`;
        } else {
            document.title = `${currSOV.abbr} - ${text}`;
        }
    }
    
}

// Initialises the favourites playlist
function initFavPlaylist(){

    playlists[0] = favouritePlaylist;
    let favId = "fav";
    let tracksHolderId = favId + "-items";
    let favCounter = 1;

    let runtimeHr = 0, runtimeMin = 0, runtimeSec = 0;

    for (let track of favouritePlaylist) {
        let val = favCounter - 1;
        let listId = favId + "-" + favCounter.toString();
        let listFavId = "fav-button-" + favCounter.toString();
        let trackHTML = `
        <li id="${listId}" onclick="favTrackClickEvent('${listId}', 0, ${val}, true)">
            <div class="playlist-track">
            <button id="${listFavId}" class="track-favourite"><i
            class="material-icons-round">favorite</i></button>
                <p class="track-number">${favCounter}</p>
                <p class="track-title">${track.name}</p>
                <p class="track-composer">${track.composer}</p>
                <p class="track-duration">${track.duration}</p>
            </div>
        </li>`;
        $("#" + tracksHolderId).append(trackHTML);
        favCounter++;

        $("#" + listFavId).click(function (event) {
            event.stopPropagation();
            console.log("Doing something!");
            removeFromFavourites(track.id, track);
        });

        let timeArr = track.duration.split(":");
        runtimeMin += parseInt(timeArr[0]);
        runtimeSec += parseInt(timeArr[1]);
    }

    runtimeMin += runtimeSec / 60;
    runtimeHr = runtimeMin / 60;
    runtimeMin = runtimeMin % 60;
    let runtimeStr = Math.floor(runtimeHr) + " hours and " + Math.round(runtimeMin) + " minutes";

    $("#playlist-runtime").html(runtimeStr);
    $("#playlist-track-count").html(favouritePlaylist.length + " tracks");
}

// Handles the clicking event on a favourited item
function favTrackClickEvent(listId, playlistIndex, id, isClick) {
    if (isClick) currIndex = id;
    if (playlistIndex != null) currPlaylist = playlists[playlistIndex];
    if (listId != currTrack) {
        $("#" + listId).addClass("track-highlighted");
        $("#" + currTrack).removeClass("track-highlighted");
        
        currTrack = listId;
    }

    currSOV = sovJSON[playlistIndex];

    $(".jp-composer").text(`${playlists[playlistIndex][id].composer}`)
    $(".jp-np-img").attr("src", `${currSOV.album_art}`)
    $(".jp-current-playlist").text(`in playlist "${currSOV.title}"`);
    $(".jp-curr-count").text(`${currIndex + 1} / ${currPlaylist.length}`);
    myPlayer.jPlayer("setMedia", currPlaylist[id]);
    myPlayer.jPlayer("play");
}

// Adds a track to the list of favourites, and saves
function addToFavourites(trackId, track, sov) {
    track.sov = sov;
    track.id= trackId;
    favouritePlaylist.push(track);
    favouritePlaylistIds.push(trackId);
    
    createToast(`Added "${track.name}" to favourites.`);

    localStorage.setItem("sov-favouritePlaylist", JSON.stringify(favouritePlaylist));
    localStorage.setItem("sov-favouritePlaylistIds", JSON.stringify(favouritePlaylistIds));

    let tracksHolderId = "fav-items";
    $("#" + tracksHolderId).html("");

    playlists[0].tracks = favouritePlaylist;
    
    $("#playlist-track-count").html(favouritePlaylist.length + " tracks");

    initFavPlaylist();
}

// Removes a track from the list of favourites, and saves
function removeFromFavourites(trackId, track) {
    console.log("Removing " + track.name + " from favourites.");
    let index = favouritePlaylistIds.indexOf(trackId);
    if (index > -1) {
        favouritePlaylist.splice(index, 1);
        favouritePlaylistIds.splice(index, 1);
    }

    createToast(`Removed "${track.name}" from favourites.`);

    localStorage.setItem("sov-favouritePlaylist", JSON.stringify(favouritePlaylist));
    localStorage.setItem("sov-favouritePlaylistIds", JSON.stringify(favouritePlaylistIds));

    let tracksHolderId = "fav-items";
    $("#" + tracksHolderId).html("");
    
    $("#" + trackId + "-fav").html('<i class="material-icons-round">favorite_border</i>');
    
    playlists[0].tracks = favouritePlaylist;

    $("#playlist-track-count").html(favouritePlaylist.length + " tracks");

    initFavPlaylist();
}

function resetFavouritesPlaylist() {
    favouritePlaylist = [];
    favouritePlaylistIds = [];
    
    localStorage.setItem("sov-favouritePlaylist", JSON.stringify(favouritePlaylist));
    localStorage.setItem("sov-favouritePlaylistIds", JSON.stringify(favouritePlaylistIds));

    createToast("Favourites playlist has been reset!");
    initFavPlaylist();
}

// Toggles the shuffle option for the player on and off
function toggleShuffle() {
    if (isShuffle) {
        createToast("Shuffle has been enabled!");
        $(".jp-shuffle").css("color", "var(--main-text-colour)");
    } else {
        createToast("Shuffle has been disabled!");
        $(".jp-shuffle").css("color", "var(--divider-colour)");
    }
}

// Handles toast creation at the bottom of the page
function createToast(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// Handles the shuffling of the array
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function toggleLoading(tf) {
    if(tf) {
        $(".load-bar").show();
        $(".jp-play-bar").hide();
        $(".jp-play-bar-bg").hide();
    } else {
        $(".load-bar").hide();
        $(".jp-play-bar").show();
        $(".jp-play-bar-bg").show();
    }
}

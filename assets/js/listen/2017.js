// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/2.0.18/plyr.js

// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '../music/2017/',
            extension = '',
            tracks = [
			{ "track": "1", "name": "I Carry Your Heart (by Connor Koppin)", "duration": "05:03", "file": "carry" },
			{ "track": "2", "name": "Nader My God By U (by André van der Merwe)", "duration": "03:20", "file": "nader" },
			{ "track": "3", "name": "Let Thy Love Play Upon My Voice (by Aldo Joson)", "duration": "04:44", "file": "upon" },
			{ "track": "4", "name": "Pater Noster (by John August Pamintuan)", "duration": "03:59", "file": "pater" },
			{ "track": "5", "name": "Je Suis Déshéritée (by Pierre Cadéac)", "duration": "03:46", "file": "desheritee" },
			{ "track": "6", "name": "A Basque Lullaby (by Dan Forrest)", "duration": "04:05", "file": "basque" },
			{ "track": "7", "name": "Plenty Good Room (by Kirby Shaw)", "duration": "03:15", "file": "plenty" },
			{ "track": "8", "name": "Only In Sleep (by Ēriks Ešenvalds)", "duration": "06:27", "file": "sleep" },
			{ "track": "9", "name": "Long Road (by Ēriks Ešenvalds)", "duration": "06:04", "file": "road" },
			{ "track": "10", "name": "Sure On This Shining Night (by Morten Lauridsen)", "duration": "04:12", "file": "shining" },
			{ "track": "11", "name": "La Luna (by Z. Randall Stroope)", "duration": "05:00", "file": "luna" },
			{ "track": "12", "name": "We Beheld Once Again the Stars (by Z. Randall Stroope)", "duration": "07:31", "file": "beheld" },
			{ "track": "13", "name": "De Circuitu Aeterno (by Petr Eben)", "duration": "03:22", "file": "aeterno" },
			{ "track": "14", "name": "Starlight (by Keith Thomas, arranged by David Maddux)", "duration": "03:33", "file": "starlight" },
			{ "track": "15", "name": "I Sing The Body Electric (by Ed Lojeski)", "duration": "03:31", "file": "electric" },
			{ "track": "16", "name": "Iuppiter (by Michael Ostrzyga)", "duration": "04:15", "file": "iuppiter" },
			{ "track": "17", "name": "Across the Vast Eternal Sky (by Ola Gjeilo)", "duration": "04:50", "file": "eternal" },
			{ "track": "18", "name": "Let My Love Be Heard (by Jake Runestad)", "duration": "04:12", "file": "heard" },
			{ "track": "19", "name": "No Man Is An Island", "duration": "03:37", "file": "no" },
			
			],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><span class="plNum">' + trackNumber + '.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

// initialize plyr
plyr.setup($('#audio1'), {});
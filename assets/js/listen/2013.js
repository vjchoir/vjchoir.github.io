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
            mediaPath = '../music/2013/',
			sovTitle = 'SOV2013',
            extension = '',
            tracks = [
				{ "track": "1", "name": "Magnificat (by Giles Swayne)", "duration": "03:53", "file": "01 Magnificat" },
				{ "track": "2", "name": "Phoenix (by Ola Gjeilo)", "duration": "04:34", "file": "02 Phoenix" },
				{ "track": "3", "name": "Ronde (by Maurice Ravel)", "duration": "01:56", "file": "03 Ronde" },
				{ "track": "4", "name": "Yunemita Monowa (by Kohei Tanaka)", "duration": "05:05", "file": "04 Yumemita Monowa" },
				{ "track": "5", "name": "Lay a Garland (by Robert Pearsall)", "duration": "03:12", "file": "05 Lay a Garland" },
				{ "track": "6", "name": "Lux Aurumque (by Eric Whitacre)", "duration": "03:17", "file": "06 Lux Aurumque" },
				{ "track": "7", "name": "Nox Aurumque (by Eric Whitacre)", "duration": "05:42", "file": "07 Nox Aurumque" },
				{ "track": "8", "name": "Magnificat Gloria (by Alberto Gran)", "duration": "06:26", "file": "08 Magnificat Gloria" },
				{ "track": "9", "name": "It Was A Lover and His Lass (by Thomas Morley)", "duration": "01:35", "file": "09 Lover and His Lass" },
				{ "track": "10", "name": "Flora Gave Me Fairest Flowers (by John Wilbye)", "duration": "02:13", "file": "10 Flora Gave Me Fairest Flowers" },
				{ "track": "11", "name": "Greensleeves (by R. Vaughan Williams)", "duration": "04:09", "file": "11 Greensleeves" },
				{ "track": "12", "name": "Dashing Away With the Smoothing Iron (by John Rutter)", "duration": "02:28", "file": "12 Dashing Away With The Smoothing Iron" },
				{ "track": "13", "name": "The Oak and the Ash (by Gordon Langford)", "duration": "03:07", "file": "13 She_s Like A Swallow" },
				{ "track": "14", "name": "She's Like A Swallow (by Edward T. Chapman)", "duration": "03:21", "file": "14 The Oak and The Ash" },
				{ "track": "15", "name": "O My Love is Like a Red, Red Rose (by Simon Carrington)", "duration": "04:02", "file": "15 O My Love is Like a Red, Red Rose" },
				{ "track": "16", "name": "Nae Luck About the House (by Gordon Langford)", "duration": "02:48", "file": "16 Nae Luck About The House" },
				{ "track": "17", "name": "Distant Land (by John Rutter)", "duration": "04:20", "file": "17 Distant Land" },
				{ "track": "18", "name": "Bobby Shaftoe (by Gordon Langford)", "duration": "01:34", "file": "18 Bobby Shaftoe" },
				{ "track": "19", "name": "No Man Is An Island", "duration": "03:07", "file": "19 No Man Is An Island" }
			
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
				document.title = sovTitle + (' - ') + tracks[index].name;
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
				document.title = sovTitle + (' - Paused...');
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
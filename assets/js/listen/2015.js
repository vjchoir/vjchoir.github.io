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
            mediaPath = '../music/2015/',
			sovTitle = 'SOV2015',
            extension = '',
            tracks = [
				{ "track": "1", "name": "There Is Sweet Music Here (by Z. Randall Stroope)", "duration": "03:08", "file": "01 Sweet Music" },
		{ "track": "2", "name": "Stopping By Woods On A Snowy Evening (by Ruth Artman)", "duration": "02:26", "file": "02 Stopping By Woods" },
		{ "track": "3", "name": "Trees (by Oscar Rasbach)", "duration": "01:57", "file": "03 Trees" },
		{ "track": "4", "name": "Full Fathom Five (by R. Vaughan Williams)", "duration": "03:29", "file": "04 Full Fathom Five" },
		{ "track": "5", "name": "Linden Lea (by R. Vaughan Williams)", "duration": "02:35", "file": "05 Linden Lea" },
		{ "track": "6", "name": "刺 (Ci) (by Zechariah Goh)", "duration": "04:07", "file": "06 Ci" },
		{ "track": "7", "name": "猜调 (Cai Diao) (by Zechariah Goh)", "duration": "02:10", "file": "07 Cai Diao" },
		{ "track": "8", "name": "Itsuki no Komori uta (by Ko Matsushita)", "duration": "04:12", "file": "08 Itsuki" },
		{ "track": "9", "name": "Karimatanu Kuicha (by Ko Matsushita)", "duration": "04:16", "file": "09 Karimatanu" },
		{ "track": "10", "name": "Chant to Bring Back the Wolf and Chant to Make the Magic Work (by R. Murray Schafer)", "duration": "02:33", "file": "10 Magic Songs" },
		{ "track": "11", "name": "Snowforms (by R. Murray Schafer)", "duration": "07:48", "file": "11 Snowforms" },
		{ "track": "12", "name": "Guitarra (by Stephen Smith)", "duration": "02:45", "file": "12 Guitarra" },
		{ "track": "13", "name": "Lux Aurumque (by Eric Whitacre)", "duration": "03:15", "file": "13 Lux Aurumque" },
		{ "track": "14", "name": "O Nata Lux (by Guy Forbes)", "duration": "03:31", "file": "14 O Nata Lux" },
		{ "track": "15", "name": "Aglepta (by Arne Mellnas)", "duration": "03:26", "file": "15 Aglepta" },
		{ "track": "16", "name": "De Circuitu Aeterno (by Petr Eben)", "duration": "03:32", "file": "16 De Circuitu" },
		{ "track": "17", "name": "Pseudo Yoik (by Jaakko Mäntyjärvi)", "duration": "02:05", "file": "17 Pseudo Yoik" },
		{ "track": "18", "name": "Northern Lights (by Ēriks Ešenvalds)", "duration": "06:49", "file": "18 Northern Lights" },
		{ "track": "19", "name": "Yagi Bushi (by Ko Matsushita)", "duration": "03:45", "file": "19 Yagi Bushi" },
		{ "track": "20", "name": "Entreat Me Not To Leave Youb (by Dan Forrest)", "duration": "06:29", "file": "20 Entreat Me" },
		{ "track": "21", "name": "No Man Is An Island", "duration": "03:15", "file": "21 No Man" }
			
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
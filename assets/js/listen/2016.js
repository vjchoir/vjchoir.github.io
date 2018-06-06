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
            mediaPath = '../music/2016/',
			sovTitle = 'SOV2016',
            extension = '',
            tracks = [
			{ "track": "1", "name": "Hallelujah (by George Frideric Handel)", "duration": "04:18", "file": "1 Hallelujah" },
			{ "track": "2", "name": "Ne Timeas Maria (by Tomás Luis de Victoria)", "duration": "03:12", "file": "2 Ne Timeas Maria" },
		{ "track": "3", "name": "Abendlied (by Josef Rheinberger)", "duration": "03:06", "file": "3 Abendlied" },
		{ "track": "4", "name": "Rest (by R. Vaughan Williams)", "duration": "03:29", "file": "4 Rest" },
		{ "track": "5", "name": "Tomorrow Shall Be My Dancing Day (by Philip Stopford)", "duration": "02:29", "file": "5 Tomorrow" },
		{ "track": "6", "name": "Unicornis Captivatur (by Ola Gjeilo)", "duration": "05:55", "file": "6 Unicornis" },
		{ "track": "7", "name": "Te Deum (by Franz Joseph Haydn)", "duration": "09:18", "file": "7 Te Deum" },
		{ "track": "8", "name": "可爱的山乡 (The Lovely Mountain Village) (by Leong Yoon Pin)", "duration": "01:42", "file": "8 The Lovely Mountain Village" },
		{ "track": "9", "name": "唱起山歌岭游 (Mountain Voyage of Folk Songs) (by Leong Yoon Pin)", "duration": "02:31", "file": "9 Mountain Voyage of Folk Songs" },
		{ "track": "10", "name": "思念 (Nostalgia) (by Leong Yoon Pin)", "duration": "04:26", "file": "10 Nostalgia" },
		{ "track": "11", "name": "街頭巷尾 (Street Calls) (by Leong Yoon Pin)", "duration": "03:20", "file": "11 Street Calls" },
		{ "track": "12", "name": "The Heaven's Flock (by Ēriks Ešenvalds)", "duration": "03:50", "file": "12 The Heaven's Flock" },
		{ "track": "13", "name": "Rivers of Light (by Ēriks Ešenvalds)", "duration": "07:04", "file": "13 Rivers of Light" },
		{ "track": "14", "name": "The New Moon (by Ēriks Ešenvalds)", "duration": "04:19", "file": "14 The New Moon" },
		{ "track": "15", "name": "Amazing Grace (by Ēriks Ešenvalds)", "duration": "05:44", "file": "15 Amazing Grace" },
		{ "track": "16", "name": "Northern Lights (by Ēriks Ešenvalds)", "duration": "06:47", "file": "16 Northern Lights" },
		{ "track": "17", "name": "No Man Is An Island", "duration": "03:31", "file": "17 No Man Is An Island" }

			
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
				document.title = tracks[id].name;
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
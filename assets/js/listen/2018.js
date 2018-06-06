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
            mediaPath = '../music/2018/',
			sovTitle = 'SOV2018',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Lux Aeterna (by Ēriks Ešenvalds)",
                "duration": "3:18",
                "file": "lux"
            }, {
                "track": 2,
                "name": "Malagueña (by Einojuhani Rautavaara)",
                "duration": "1:06",
                "file": "mala"
            }, 
			{
                "track": 3,
                "name": "Wandering Heart (by Ēriks Ešenvalds)",
                "duration": "4:49",
                "file": "wander"
            }, 
			
			{
                "track": 4,
                "name": "Star of the County Down (arranged by Ben Parry)",
                "duration": "3:12",
                "file": "star"
            }, 
			
			{
                "track": 5,
                "name": "She Walks In Beauty (by Seow Mao Yu)",
                "duration": "3:44",
                "file": "beauty"
            }, 
			
			{
                "track": 6,
                "name": "The Cloud (by Toh Xin Long)",
                "duration": "4:39",
                "file": "cloud"
            }, 
			
			{
                "track": 7,
                "name": "Leonardo Dreams Of His Flying Machine (by Eric Whitacre)",
                "duration": "8:30",
                "file": "leonardo"
            },
			
			{
                "track": 8,
                "name": "Phoenix (by Ola Gjeilo)",
                "duration": "5:08",
                "file": "phoenix"
            }, 
			
			{
                "track": 9,
                "name": "Among The Leaves So Green, O (by John Byrt)",
                "duration": "02:32",
                "file": "leaves"
            }, 
			
			{
                "track": 10,
                "name": "The Teddy Bear's Picnic (by John W. Bratton)",
                "duration": "02:03",
                "file": "teddy"
            }, 
			
			{
                "track": 11,
                "name": "Unicornis Captivatur (by Ola Gjeilo)",
                "duration": "06:05",
                "file": "unicorn"
            },
			
			{
                "track": 12,
                "name": "Double, Double Toil and Trouble (by Jaakko Mantyjarvi)",
                "duration": "02:58",
                "file": "trouble"
            },
			
			{
                "track": 13,
                "name": "The Goslings (by Frederick Bridge)",
                "duration": "02:57",
                "file": "goslings"
            },
			
			{
                "track": 14,
                "name": "The Mermaid (arranged by John Whitworth)",
                "duration": "03:35",
                "file": "mermaid"
            },
			
			{
                "track": 15,
                "name": "Africa (by David Paich and Jeff Porcaro, arranged by Phillip Lawson)",
                "duration": "04:01",
                "file": "africa"
            },
			
			{
                "track": 16,
                "name": "The Circle of Life",
                "duration": "04:15",
                "file": "circle"
            },
			
			{
                "track": 17,
                "name": "No Man Is An Island",
                "duration": "03:24",
                "file": "no"
            }
			
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
            audio = $('#audio1').on('play', function (id) {
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
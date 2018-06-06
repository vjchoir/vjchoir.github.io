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
            mediaPath = '../music/2014/',
			sovTitle = 'SOV2014',
            extension = '',
            tracks = [
				{ "track": "1", "name": "Pastime with Good Company (by Henry VIII)", "duration": "01:42", "file": "1 Pastime with Good Company" },
{ "track": "2", "name": "Die mit Tränen säen (by Heinrich Schütz)", "duration": "03:41", "file": "2 Die mit tranen saen mit freuden ernten" },
{ "track": "3", "name": "Crucifixus (by Antionio Lotti)", "duration": "03:18", "file": "3 Crucifixus" },
{ "track": "4", "name": "Io Piango by Morten Lauridsen", "duration": "02:15", "file": "4 Io Piango" },
{ "track": "5", "name": "Ciao, Bella Ciao by Ben Parry", "duration": "03:17", "file": "5 Ciao, Bella Ciao" },
{ "track": "6", "name": "The Battle of Jericho", "duration": "02:11", "file": "6 The Battle of Jericho" },
{ "track": "7", "name": "Alleluia (by Ralph Manuel)", "duration": "04:04", "file": "7 Alleluia" },
{ "track": "8", "name": "O Nata Lux (by Guy Forbes)", "duration": "03:53", "file": "8 O Nata Lux" },
{ "track": "9", "name": "The Spheres (by Ola Gjeilo)", "duration": "4:55", "file": "9 The Spheres" },
{ "track": "10", "name": "Japanese Game (by Ko Matsushita)", "duration": "03:54", "file": "10 Japanese Game" },
{ "track": "11", "name": "Itsuki no Komori Uta (by Ko Matsushita)", "duration": "04:16", "file": "11 Itsuki no Komori uta" },
{ "track": "12", "name": "双城恋曲 (Love in Two Cities) (by Nelson Kwei)", "duration": "03:43", "file": "12 Love in Two Cities" },
{ "track": "13", "name": "沂蒙山歌 (Yi Meng Shan Ge) (by Zhang Yida)", "duration": "03:23", "file": "13 Yi Meng Shan Ge" },
{ "track": "14", "name": "Reminiscences of Hainan (by Dr. Zechariah Goh Toh Chai)", "duration": "04:16", "file": "14 Reminiscences of Hainan" },
{ "track": "15", "name": "Dayo Dayo Kupita (by Nilo Alcala)", "duration": "03:10", "file": "15 Dayo Dayo Kupita" },
{ "track": "16", "name": "Naiman Sharag (by Se Enkhbayar)", "duration": "03:29", "file": "16 Naiman Sharag" },
{ "track": "17", "name": "Meplalian (by Budi Susanto Yohanes)", "duration": "03:07", "file": "17 Meplalian" },
{ "track": "18", "name": "Yamko Rambe Yamko (by Agustinus Bambang Jusana)", "duration": "02:52", "file": "18 Yamko Rambe Yamko" },
{ "track": "19", "name": "All My Heart This Night Rejoices (by Z. Randall Stroope)", "duration": "04:14", "file": "19 All My Heart This Night Rejoices" },
{ "track": "20", "name": "No Man Is An Island", "duration": "03:07", "file": "20 No Man Is An Island" }
			
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
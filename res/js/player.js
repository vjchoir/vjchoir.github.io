// Dependencies:
// 
// 
// 

// Mythium Archive: https://archive.org/details/mythium/

console.log("player.js initialising...");
console.log("Loading scripts...");

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

$.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js");
$.loadScript("https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js");
$.loadScript("https://cdnjs.cloudflare.com/ajax/libs/plyr/3.3.21/plyr.min.js");

/* SOV arrays */
var SOV2018 = [{"track":1, "name": "Lux Aeterna", "composer": "Ēriks Ešenvalds", "duration": "3:18", "file": "1 Lux Aeterna"},
{"track":2, "name": "Malagueña", "composer": "Einojuhani Rautavaara", "duration": "1:06", "file": "2 Malaguena"},
{"track":3, "name": "Wandering Heart", "composer": "Ēriks Ešenvalds", "duration": "4:49", "file": "3 Wandering Heart"},
{"track":4, "name": "Star of the County Down", "composer": "Ben Parry", "duration": "3:12", "file": "4 Star of the County Down"},
{"track":5, "name": "She Walks In Beauty", "composer": "Seow Mao Yu", "duration": "3:44", "file": "5 She Walks In Beauty"},
{"track":6, "name": "The Cloud", "composer": "Toh Xin Long", "duration": "4:39", "file": "6 The Cloud"},
{"track":7, "name": "Leonardo Dreams of His Flying Machine", "composer": "Eric Whitacre", "duration": "8:30", "file": "7 Leonardo Dreams of His Flying Machine"},
{"track":8, "name": "Phoenix", "composer": "Ola Gjeilo", "duration": "5:08", "file": "8 Phoenix"},
{"track":9, "name": "Among the Leaves So Green, O", "composer": "John Byrt", "duration": "2:32", "file": "9 Among the Leaves So Green, O"},
{"track":10, "name": "The Teddy Bear's Picnic", "composer": "John W. Bratton", "duration": "2:03", "file": "10 The Teddy Bear's Picnic"},
{"track":11, "name": "Unicornis Captivatur", "composer": "Ola Gjeilo", "duration": "6:05", "file": "11 Unicornis Captivatur"},
{"track":12, "name": "Double, Double Toil and Trouble", "composer": "Jaako Mantyjarvi", "duration": "2:58", "file": "12 Double, Double Toil and Trouble"},
{"track":13, "name": "The Goslings", "composer": "Frederick Bridge", "duration": "2:57", "file": "13 The Goslings"},
{"track":14, "name": "The Mermaid", "composer": "John Whitworth", "duration": "3:35", "file": "14 The Mermaid"},
{"track":15, "name": "Africa", "composer": "Phillip Lawson", "duration": "4:01", "file": "15 Africa"},
{"track":16, "name": "The Circle of Life", "composer": "unknown", "duration": "4:15", "file": "16 The Circle of Life"},
{"track":17, "name": "No Man Is An Island", "composer": "Roy Ringwald", "duration": "3:24", "file": "17 No Man Is An Island"}
]

var SOV2017 = [{"track":1, "name": "I Carry Your Heart", "composer": "Connor Koppin", "duration": "5:03", "file": "1 I Carry Your Heart"},
{"track":2, "name": "Nader My God By U", "composer": "André van der Merwe", "duration": "3:20", "file": "2 Nader My God By U"},
{"track":3, "name": "Let Thy Love Play Upon My Voice", "composer": "Aldo Joson", "duration": "4:44", "file": "3 Let Thy Love Play Upon My Voice"},
{"track":4, "name": "Pater Noster", "composer": "John August Pamintuan", "duration": "3:59", "file": "4 Pater Noster"},
{"track":5, "name": "Je Suis Déshéritée", "composer": "Pierre Cadéac", "duration": "3:46", "file": "5 Je Suis Desheritee"},
{"track":6, "name": "A Basque Lullaby", "composer": "Dan Forrest", "duration": "4:05", "file": "6 A Basque Lullaby"},
{"track":7, "name": "Plenty Good Room", "composer": "Kirby Shaw", "duration": "3:15", "file": "7 Plenty Good Room"},
{"track":8, "name": "Only In Sleep", "composer": "Ēriks Ešenvalds", "duration": "6:27", "file": "8 Only In Sleep"},
{"track":9, "name": "Long Road", "composer": "Ēriks Ešenvalds", "duration": "6:04", "file": "9 Long Road"},
{"track":10, "name": "Sure On This Shining Night", "composer": "Morten Lauridsen", "duration": "4:12", "file": "10 Sure On This Shining Night"},
{"track":11, "name": "La Luna", "composer": "Z. Randall Stroope", "duration": "5:00", "file": "11 La Luna"},
{"track":12, "name": "We Beheld Once Again the Stars", "composer": "Z. Randall Stroope", "duration": "7:31", "file": "12 We Beheld Once Again the Stars"},
{"track":13, "name": "De Circuitu Aeterno", "composer": "Petr Eben", "duration": "3:22", "file": "13 De Circuitu Aeterno"},
{"track":14, "name": "Starlight", "composer": "Keith Thomas", "duration": "3:33", "file": "14 Starlight"},
{"track":15, "name": "I Sing The Body Electric", "composer": "Ed Lojeski", "duration": "3:31", "file": "15 I Sing The Body Electric"},
{"track":16, "name": "Iuppiter", "composer": "Michael Ostrzyga", "duration": "4:15", "file": "16 Iuppiter"},
{"track":17, "name": "Across the Vast Eternal Sky", "composer": "Ola Gjeilo", "duration": "4:50", "file": "17 Across the Vast Eternal Sky"},
{"track":18, "name": "Let My Love Be Heard", "composer": "Jake Runestad", "duration": "4:12", "file": "18 Let My Love Be Heard"},
{"track":19, "name": "No Man Is An Island", "composer": "Roy Ringwald", "duration": "3:37", "file": "19 No Man Is An Island"}
]

var SOV2016 = [{"track":1, "name": "Hallelujah", "composer": "George Frideric Handel", "duration": "4:18", "file": "1 Hallelujah"},
{"track":2, "name": "Ne Timeas Maria", "composer": "Tomás Luis de Victoria", "duration": "3:12", "file": "2 Ne Timeas Maria"},
{"track":3, "name": "Abendlied", "composer": "Josef Rheinberger", "duration": "3:06", "file": "3 Abendlied"},
{"track":4, "name": "Rest", "composer": "R. Vaughan Williams", "duration": "3:29", "file": "4 Rest"},
{"track":5, "name": "Tomorrow Shall Be My Dancing Day", "composer": "Philip Stopford", "duration": "2:29", "file": "5 Tomorrow"},
{"track":6, "name": "Unicornis Captivatur", "composer": "Ola Gjeilo", "duration": "5:55", "file": "6 Unicornis"},
{"track":7, "name": "Te Deum", "composer": "Franz Joseph Haydn", "duration": "9:18", "file": "7 Te Deum"},
{"track":8, "name": "可爱的山乡 (The Lovely Mountain Village)", "composer": "Yeong Loon Pin", "duration": "1:42", "file": "8 The Lovely Mountain Village"},
{"track":9, "name": "唱起山歌岭游 (Mountain Voyage of Folk Songs)", "composer": "Yeong Loon Pin", "duration": "2:31", "file": "9 Mountain Voyage of Folk Songs"},
{"track":10, "name": "思念 (Nostalgia)", "composer": "Yeong Loon Pin", "duration": "4:26", "file": "10 Nostalgia"},
{"track":11, "name": "街頭巷尾 (Street Calls) ", "composer": "Yeong Loon Pin", "duration": "3:20", "file": "11 Street Calls"},
{"track":12, "name": "The Heaven's Flock", "composer": "Ēriks Ešenvalds", "duration": "3:50", "file": "12 The Heaven's Flock"},
{"track":13, "name": "Rivers of Light", "composer": "Ēriks Ešenvalds", "duration": "7:04", "file": "13 Rivers of Light"},
{"track":14, "name": "The New Moon", "composer": "Ēriks Ešenvalds", "duration": "4:19", "file": "14 The New Moon"},
{"track":15, "name": "Amazing Grace", "composer": "Ēriks Ešenvalds", "duration": "5:44", "file": "15 Amazing Grace"},
{"track":16, "name": "Northern Lights", "composer": "Ēriks Ešenvalds", "duration": "6:47", "file": "16 Northern Lights"},
{"track":17, "name": "No Man Is An Island", "composer": "Roy Ringwald", "duration": "3:31", "file": "17 No Man Is An Island"}
]

var SOV2015 = [{"track":1, "name": "There is Sweet Music Here", "composer": "Z. Randall Stroope", "duration": "3:08", "file": "01 Sweet Music"},
{"track":2, "name": "Stopping by Woods On A Snowy Evening", "composer": "Ruth Artman", "duration": "2:26", "file": "02 Stopping By Woods"},
{"track":3, "name": "Trees", "composer": "Oscar Rasbach", "duration": "1:57", "file": "03 Trees"},
{"track":4, "name": "Full Fathom Five", "composer": "R. Vaughan Williams", "duration": "3:29", "file": "04 Full Fathom Five"},
{"track":5, "name": "Linden Lea", "composer": "R. Vaughan Williams", "duration": "2:35", "file": "05 Linden Lea"},
{"track":6, "name": "刺 (Ci)", "composer": "Zechariah Goh Toh Chai", "duration": "4:07", "file": "06 Ci"},
{"track":7, "name": "猜调 (Cai Diao)", "composer": "Zechariah Goh Toh Chai", "duration": "2:10", "file": "07 Cai Diao"},
{"track":8, "name": "Itsuki no Komori Uta", "composer": "Ko Matsushita", "duration": "4:12", "file": "08 Itsuki"},
{"track":9, "name": "Karimatanu Kuicha", "composer": "Ko Matsushita", "duration": "4:16", "file": "09 Karimatanu"},
{"track":10, "name": "Chant to Bring Back the Wolf & Chant to Make the Magic Work", "composer": "R. Murray Schafer", "duration": "2:33", "file": "10 Magic Songs"},
{"track":11, "name": "Snowforms", "composer": "R. Murray Schafer", "duration": "7:48", "file": "11 Snowforms"},
{"track":12, "name": "Guitarra", "composer": "Stephen Smith", "duration": "2:45", "file": "12 Guitarra"},
{"track":13, "name": "Lux Aurumque", "composer": "Eric Whitacre", "duration": "3:15", "file": "13 Lux Aurumque"},
{"track":14, "name": "O Nata Lux", "composer": "Guy Forbes", "duration": "3:31", "file": "14 O Nata Lux"},
{"track":15, "name": "Aglepta", "composer": "Arne Mellnas", "duration": "3:26", "file": "15 Aglepta"},
{"track":16, "name": "De Circuitu Aeterno", "composer": "Petr Eben", "duration": "3:32", "file": "16 De Circuitu"},
{"track":17, "name": "Pseudo Yoik", "composer": "Jaakko Mäntyjärvi", "duration": "2:05", "file": "17 Pseudo Yoik"},
{"track":18, "name": "Northern Lights", "composer": "Ēriks Ešenvalds", "duration": "6:49", "file": "18 Northern Lights"},
{"track":19, "name": "Yagi Bushi", "composer": "Ko Matsuhita", "duration": "3:45", "file": "19 Yagi Bushi"},
{"track":20, "name": "Entreat Me Not To Leave You", "composer": "Dan Forrest", "duration": "6:29", "file": "20 Entreat Me"},
{"track":21, "name": "No Man Is An Island", "composer": "Roy Ringwald", "duration": "3:15", "file": "21 No Man"}

]

var SOV2014 = [{"track":1, "name": "Pastime with Good Company", "composer": "Henry VIII", "duration": "1:43", "file": "1 Pastime with Good Company"},
{"track":2, "name": "Die mit Tränen säen", "composer": "Heinrich Schütz", "duration": "3:42", "file": "2 Die mit Tranen saen mit freuden ernten"},
{"track":3, "name": "Crucifixus", "composer": "Antonio Lotti", "duration": "3:18", "file": "3 Crucifixus"},
{"track":4, "name": "Io Piango", "composer": "Morten Lauridsen", "duration": "2:15", "file": "4 Io Piango"},
{"track":5, "name": "Ciao, Bella Ciao", "composer": "Ben Parry", "duration": "3:18", "file": "5 Ciao, Bella Ciao"},
{"track":6, "name": "The Battle of Jericho", "composer": "unknown", "duration": "2:11", "file": "6 The Battle of Jericho"},
{"track":7, "name": "Alleluia", "composer": "Ralph Manuel", "duration": "4:05", "file": "7 Alleluia"},
{"track":8, "name": "O Nata Lux", "composer": "Guy Forbes", "duration": "3:53", "file": "8 O Nata Lux"},
{"track":9, "name": "The Spheres", "composer": "Ola Gjeilo", "duration": "4:55", "file": "9 The Spheres"},
{"track":10, "name": "Japanese Game", "composer": "Ko Matsushita", "duration": "3:54", "file": "10 Japanese Game"},
{"track":11, "name": "Itsuki no Komori Uta", "composer": "Ko Matsushita", "duration": "4:17", "file": "11 Itsuki no Komori Uta"},
{"track":12, "name": "双城恋曲 (Love in Two Cities)", "composer": "Nelson Kwei", "duration": "3:43", "file": "12 Love in Two Cities"},
{"track":13, "name": "沂蒙山歌 (Yi Meng Shan Ge)", "composer": "张以达 (Zhang Yida)", "duration": "3:24", "file": "13 Yi Meng Shan Ge"},
{"track":14, "name": "Reminiscences of Hainan", "composer": "Zechariah Goh Toh Chai", "duration": "4:17", "file": "14 Reminiscences of Hainan"},
{"track":15, "name": "Dayo Dayo Kupita", "composer": "Nilo Alcala", "duration": "3:11", "file": "15 Dayo Dayo Kupita"},
{"track":16, "name": "Naiman Sharag", "composer": "Se Enkhbayar", "duration": "3:29", "file": "16 Naiman Sharag"},
{"track":17, "name": "Meplalian", "composer": "Budi Susanto Yohanes", "duration": "3:08", "file": "17 Meplalian"},
{"track":18, "name": "Yamko Rambe Yamko", "composer": "Agustinus Bambang Jusana", "duration": "2:52", "file": "18 Yamko Rambe Yamko"},
{"track":19, "name": "All My Heart This Night Rejoices", "composer": "Z. Randall Stroope", "duration": "4:15", "file": "19 All My Heart This Night Rejoices"},
{"track":20, "name": "No Man Is An Island", "composer": "Roy Ringwald", "duration": "3:07", "file": "20 No Man Is An Island"}
];

var SOV2013 = [{"track":1, "name": "Magnificat", "composer": "Giles Swayne", "duration": "3:53", "file": "01 Magnificat"},
{"track":2, "name": "Phoenix", "composer": "Ola Gjeilo", "duration": "4:34", "file": "02 Phoenix"},
{"track":3, "name": "Ronde", "composer": "Maurice Ravel", "duration": "1:56", "file": "03 Ronde"},
{"track":4, "name": "Yumemita Monowa", "composer": "Kohei Tanaka", "duration": "5:05", "file": "04 Yumemita Monowa"},
{"track":5, "name": "Lay a Garland", "composer": "Robert Pearsall", "duration": "3:12", "file": "05 Lay a Garland"},
{"track":6, "name": "Lux Aurumque", "composer": "Eric Whitacre", "duration": "3:17", "file": "06 Lux Aurumque"},
{"track":7, "name": "Nox Aurumque", "composer": "Eric Whitacre", "duration": "5:42", "file": "07 Nox Aurumque"},
{"track":8, "name": "Magnificat Gloria", "composer": "Alberto Gran", "duration": "6:26", "file": "08 Magnificat Gloria"},
{"track":9, "name": "It Was A Lover and His Lass", "composer": "Thomas Morley", "duration": "1:35", "file": "09 Lover and His Lass"},
{"track":10, "name": "Flora Gave Me Fairest Flowers", "composer": "John Wilbye", "duration": "2:13", "file": "10 Flora Gave Me Fairest Flowers"},
{"track":11, "name": "Greensleeves", "composer": "R. Vaughan Williams", "duration": "4:09", "file": "11 Greensleeves"},
{"track":12, "name": "Dashing Away With The Smoothing Iron", "composer": "John Rutter", "duration": "2:28", "file": "12 Dashing Away With The Smoothing Iron"},
{"track":13, "name": "She's Like A Swallow", "composer": "Edward T. Chapman", "duration": "3:21", "file": "13 She's Like A Swallow"},
{"track":14, "name": "The Oak and The Ash", "composer": "Gordon Langford", "duration": "3:07", "file": "14 The Oak and The Ash"},
{"track":15, "name": "O My Love Is Like A Red, Red Rose", "composer": "Simon Carrington", "duration": "4:02", "file": "15 O My Love Is Like A Red, Red Rose"},
{"track":16, "name": "Nae Luck About the House", "composer": "Gordon Langford", "duration": "2:48", "file": "16 Nae Luck About the House"},
{"track":17, "name": "Distant Land", "composer": "John Rutter", "duration": "4:20", "file": "17 Distant Land"},
{"track":18, "name": "Bobby Shaftoe", "composer": "Gordon Langford", "duration": "1:34", "file": "18 Bobby Shaftoe"},
{"track":19, "name": "No Man Is An Island", "composer": "Roy Ringwald", "duration": "3:07", "file": "19 No Man Is An Island"}
]

var arrays_of_SOV = [SOV2018, SOV2017, SOV2016, SOV2015, SOV2014, SOV2013];

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });

        var selected_playlist = 0;
        var selected_path = "/assets/audio/SOV2018/";
        var prefix = "SOV2018";

        get_album_info(0);
        init();

        $('#SOV2018-btn').on('click', function() {
            selected_playlist = 0;
            get_album_info(0);
            selected_path = "/assets/audio/SOV2018/";
            init();
        })

        $('#SOV2017-btn').on('click', function() {
            selected_playlist = 1;
            selected_path = "/assets/audio/SOV2017/";
            get_album_info(1);
            init();
        })

        $('#SOV2016-btn').on('click', function() {
            selected_playlist = 2;
            selected_path = "/assets/audio/SOV2016/";
            get_album_info(2);
            init();
        })

        $('#SOV2015-btn').on('click', function() {
            selected_playlist = 3;
            selected_path = "/assets/audio/SOV2015/";
            get_album_info(3);
            init();
        })

        $('#SOV2014-btn').on('click', function() {
            selected_playlist = 4;
            selected_path = "/assets/audio/SOV2014/";
            get_album_info(4);
            init();
        })

        $('#SOV2013-btn').on('click', function() {
            selected_playlist = 5;
            selected_path = "/assets/audio/SOV2013/";
            get_album_info(5);
            init();
        })

        function get_album_info(index) {
            var album_info = [{
                    "title": "Symphony of Voices 2018",
                    "pref": "SOV2018",
                    "description": "Held on 23rd May 2018, at the Esplanade Concert Hall, with the theme ",
                    "theme": "All Things Bright and Beautiful",
                    "runtime": "1 hour and 6 minutes",
                    "songcount": "17",
                    "image": "/assets/images/sov/SOV2018.png"
                },
            
                {
                    "title": "Symphony of Voices 2017",
                    "pref": "SOV2017",
                    "description": "Held on 15th May 2017, at the Esplanade Concert Hall, with the theme ",
                    "theme": "Across the Vast Eternal Sky",
                    "runtime": "1 hour and 25 minutes",
                    "songcount": "19",
                    "image": "/assets/images/sov/SOV2017.jpg"
                },
                {
                    "title": "Symphony of Voices 2016",
                    "pref": "SOV2016",
                    "description": "Held on 25th May 2016, at the Esplanade Concert Hall, with the theme ",
                    "theme": "Sands of Time",
                    "runtime": "1 hour and 16 minutes",
                    "songcount": "17",
                    "image": "/assets/images/sov/SOV2016.png"
                },
                {
                    "title": "Symphony of Voices 2015",
                    "pref": "SOV2015",
                    "description": "Held on 17th May 2015, at the Esplanade Concert Hall, with the theme ",
                    "theme": "Aurora Borealis",
                    "runtime": "1 hour and 18 minutes",
                    "songcount": "21",
                    "image": "/assets/images/sov/SOV2015.jpg"
                },
                {
                    "title": "Symphony of Voices 2014",
                    "pref": "SOV2014",
                    "description": "Held on 26th May 2014, at the Esplanade Concert Hall, with the theme ",
                    "theme": "Asian",
                    "runtime": "1 hour and 9 minutes",
                    "songcount": "20",
                    "image": "/assets/images/sov/SOV2014.jpg"
                },
                {
                    "title": "Symphony of Voices 2013",
                    "pref": "SOV2013",
                    "description": "Held on 21st May 2013, at the Esplanade Concert Hall, with the theme ",
                    "theme": "Victorian",
                    "runtime": "1 hour and 7 minutes",
                    "songcount": "20",
                    "image": "/assets/images/sov/SOV2013.jpg"
                }];

            $('#album-title').text(album_info[index].title);
            $('#album-description').text(album_info[index].description);
            $('#sov-theme').text(album_info[index].theme + ".");
            $('#album-song-count').text(album_info[index].songcount + " songs");
            $('#album-runtime').text(album_info[index].runtime);
            $("#selected-album-img").attr("src", album_info[index].image);
            prefix = album_info[index].pref; 
            document.title = "Listen - " + prefix;
        }


        // initialize playlist and controls
        function init() {
            $('#plList').empty();
            var index = 0,
            playing = false,
            mediaPath = selected_path,
            extension = '',
            tracks = arrays_of_SOV[selected_playlist],
            buildPlaylist = $(tracks).each(function (key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackComposer= value.composer,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plComposer">' + trackComposer + '</span>\
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            npComposer = $('#npComposer'),
            npTrackCount = $('#npCount'),
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

                document.title = prefix + " - " + tracks[index].name;
            }).get(0),

            albumPlay = $('#album-play').on('click', function() {
                loadTrack(index);
                audio.play();
                
                document.title = prefix + " - " + tracks[index].name;
            }),

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
                    document.title = prefix + " - Paused...";
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
                npComposer.text(tracks[id].composer);
                index = id;
                npTrackCount.text((id + 1) + ' / ' + tracks.length);
                audio.src = mediaPath + tracks[id].file + extension;
                document.title = prefix + " - " + tracks[id].name;
            },
            playTrack = function (id) {
                document.title = prefix + " - " + tracks[id].name;
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
        }
        
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});

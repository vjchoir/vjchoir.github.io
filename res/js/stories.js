console.log('Loading stories.js...');
// data saver --- loads items when scrolled to

var stories_holder = $('#stories-images-holder');
var stored_scroll = 200;
var is_loaded = [false];
var curr_index = 12;

var stories = [];

init();

function init() {
    add_click_events(0);
    retrieve_data();
    add_photos();
    add_click_events();

    $('#stories-enlarged-image').hide();
    $('#stories-text-holder').hide();
}

function add_photos() {
    var photo_col1 = $('#col1');
    var photo_col2 = $('#col2');
    
    console.log(stories.length);

    for(let i = stories.length; i > 0; i --) {
        var curr = i;
        if(i % 2 !== 0) {
            photo_col2.append('<img src="assets/images/stories/s (' + curr + ').jpg">');
        } else {
            photo_col1.append('<img src="assets/images/stories/s (' + curr + ').jpg">');
        }
    }
}
// back button listener
$('#enlarged-back-button').on("click", function() {
    
    $('#stories-enlarged-image').hide();
    $('#stories-text-holder').hide();
    $('#stories-images-holder').fadeIn(500);
    $('#default-text-holder').fadeIn(500);
    
})

// on click functions 
function add_click_events() {
    var column_one = document.getElementById("col1").children;
    var column_two = document.getElementById("col2").children;  

    let col1_index = 0;
    let col2_index = 0;

    for(let i = 0; i < stories.length; i ++) {
        let curr_story = stories[i];
        console.log(curr_story.title + " has been added!");
        if(i % 2 !== 0) {
            // column_two
            column_two[col2_index].addEventListener('click', function() {
                get_story(curr_story);
            });

            col2_index ++;
        } else {
            // column_one
            column_one[col1_index].addEventListener('click', function() {
                get_story(curr_story);
            });

            col1_index ++;
        }
    }

    for(let i = stories.length / 2; i < column_one.length; i ++) {
        column_one[i].addEventListener('click', function() {
            get_story(curr_story);
        }
        );
    }

    for(let i = stories.length - stories.length / 2; i < column_two.length; i ++) {
        column_two[i].addEventListener('click', function() {
            get_story(curr_story);
        }
        );
    }
}

// loads stories from txt
function retrieve_data() {
    var raw_file = new XMLHttpRequest();
    var file = "assets/images/stories/stories.txt"
    raw_file.open("GET", file, false);

    var all_text = "";

    raw_file.onreadystatechange = function ()
    {
        if(raw_file.readyState === 4)
        {
            if(raw_file.status === 200 || raw_file.status == 0)
            {
                all_text = raw_file.responseText;
                console.log(all_text);
            }
        }
    }
    raw_file.send(null);

    var array = JSON.parse(all_text);
    for(var i = 0; i < array.length; i ++) {
        stories[i] = array[i];
    }
}

// get story from an index

function get_story(story) {
    $('#stories-title > h3').text(story.title);
    $('#stories-author').text(story.author);
    $('#stories-content').text(story.story);
    $('#stories-date').text(story.photo_taken);

    $('#stories-images-holder').hide();
    $('#stories-enlarged-image').hide();
    $('#default-text-holder').hide();

    $('#enlarged-image').attr("src", "assets/images/stories/s (" + story.index + ").jpg");
    $('#stories-text-holder').fadeIn(500);
    $('#stories-enlarged-image').fadeIn(500);

}
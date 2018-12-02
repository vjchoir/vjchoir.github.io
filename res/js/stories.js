console.log('Loading stories.js...');
// data saver --- loads items when scrolled to

var stories_holder = $('#stories-images-holder');
var stored_scroll = 200;
var is_loaded = [false];
var curr_index = 0;

var stories = [];

init();

function init() {
    add_click_events(0);
    retrieve_data();
    curr_index = 9;

    $('#stories-enlarged-image').hide();
    $('#stories-text-holder').hide();

    stories_holder.scroll(function() {
        var scroll_value = stories_holder.scrollTop();
    
        if(scroll_value > stored_scroll) {
            stored_scroll += 500;
            console.log('hello');
            
            for(var i = 0; i < is_loaded.length; i ++) {
                if(!is_loaded[i]) {
                    add_photos();
                    is_loaded[i] = true;
                    break;
                } 
            }
        } else {}
    });
}

function add_photos() {
    var photo_col1 = $('#col1');
    var photo_col2 = $('#col2');

    for(var i = 0; i < 4; i ++) {
        var curr = curr_index + i;
        if(i % 2 !== 0) {
            photo_col2.append('<img src="assets/images/stories/s (' + curr + ').jpg">');
        } else {
            photo_col1.append('<img src="assets/images/stories/s (' + curr + ').jpg">');
        }
    }

    add_click_events((curr_index-1)/2);
    curr_index += 4;
    
}
// back button listener
$('#enlarged-back-button').on("click", function() {
    
    $('#stories-enlarged-image').hide();
    $('#stories-text-holder').hide();
    $('#stories-images-holder').fadeIn(500);
    $('#default-text-holder').fadeIn(500);
    
})

// on click functions 
function add_click_events(curr_index) {
    var column_one = document.getElementById("col1").children;
    var column_two = document.getElementById("col2").children;  

    for(let i = curr_index; i < column_one.length; i ++) {
        column_one[i].addEventListener('click', function() {
            get_story(2 * i + 1);
        }
        );
    }

    for(let i = curr_index; i < column_two.length; i ++) {
        column_two[i].addEventListener('click', function() {
            get_story(2 * i + 2);
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

function get_story(index) {
    var curr = index - 1;
    var story = stories[curr];
    console.log("curr" + curr);
    $('#stories-title > h3').text(story.title);
    $('#stories-author').text(story.author);
    $('#stories-content').text(story.story);
    $('#stories-date').text(story.photo_taken);

    $('#stories-images-holder').hide();
    $('#stories-enlarged-image').hide();
    $('#default-text-holder').hide();

    $('#enlarged-image').attr("src", "assets/images/stories/s (" +  index + ").jpg");
    $('#stories-text-holder').fadeIn(500);
    $('#stories-enlarged-image').fadeIn(500);

}
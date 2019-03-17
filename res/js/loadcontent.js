var oldURL = document.referrer;
console.log('PREV PATH: ' + oldURL);
var curr_loaded = "HOME";
var currURL = "localhost:803";

// initialises page
function init() {

    // setting nav-bar name again
    var title_array = ["Home", "About", "Batches", "SOV", "Listen", "Miscellaneous"];
    
    if (oldURL.includes('home')) {
        console.log("Coming from refresh / back / direct link");
        $('#text-content-holder').load('/home.html > #text-content', function() {
            $.getScript("/res/js/home.js");
        });
        $('subitem-home').removeClass("inactive");
        $('subitem-home').addClass("active");
        window.history.replaceState("Test", "Title", "/home");
        curr_loaded = "HOME";
        rehighlight_sidebar();
        document.getElementById("navtitle").innerHTML = 'Home';
        document.title = 'The VJChoir Archives';
    } else if (oldURL.includes('about')) {
        console.log("Coming from refresh / back / direct link");
        $('#text-content-holder').load('/about.html > #text-content');
        $('subitem-about').removeClass("inactive");
        $('subitem-about').addClass("active");
        window.history.replaceState("Test", "Title", "/about");
        curr_loaded = "ABOUT";
        rehighlight_sidebar();
        document.getElementById("navtitle").innerHTML = 'About';
        document.title = 'About';
    } else if (oldURL.includes('batches')) {
        console.log("Coming from refresh / back / direct link");
        
        var end = oldURL.split('batches')[1];
        var new_link = "/batches" + end;
        console.log('New link ' + new_link);
        $('#text-content-holder').load(new_link + ' > #text-content');
        window.history.replaceState("Test", "Title", new_link);
        $('subitem-batches').removeClass("inactive");
        $('subitem-batches').addClass("active");
        curr_loaded = "BATCHES";
        rehighlight_sidebar();

        var batch_array = ["1819", "1718", "1617", "1516", "1415", "1314"];
        var batch_title_array = ["Batch of 2018 - 2019", "Batch of 2017 - 2018", "Batch of 2016 - 2017", "Batch of 2015 - 2016",
                            "Batch of 2014 - 2015", "Batch of 2013 - 2014"];
        for(var i = 0; i < batch_array.length; i ++) {
            if(end.includes(batch_array[i])) {
                document.getElementById("navtitle").innerHTML = batch_title_array[i];
                document.title = batch_title_array[i];
                break; 
            }
        }

        $('#text-content-holder').load(new_link + ' > #text-content', function() {
            $.getScript("/res/js/batches.js");
        });

    } else if (oldURL.includes('sov')) {
        
        console.log("Coming from refresh / back / direct link");
        var end = oldURL.split('sov')[1];
        var new_link = "/sov" + end;
        $('#text-content-holder').load(new_link +  ' > #text-content');
        window.history.replaceState("Test", "Title", new_link);
        $('subitem-SOV').removeClass("inactive");
        $('subitem-SOV').addClass("active");
        curr_loaded = "SYMPH OF VOICES";
        rehighlight_sidebar();

        var sov_array = ["2018", "2017", "2016", "2015", "2014", "2013", "2012"];
        var sov_title_array = ["SOV2018", "SOV2017", "SOV2016", "SOV2015", "SOV2014", "SOV2013", "SOV2012"];
        for(var i = 0; i < sov_array.length; i ++) {
            if(end.includes(sov_array[i])) {
                document.getElementById("navtitle").innerHTML = sov_title_array[i];
                document.title = sov_title_array[i];

                break; 
            }
        }

    } else if (oldURL.includes('listen')) {
        console.log("Coming from refresh / back / direct link");
        $('#text-content-holder').load('/listen.html > #text-content', function() {
            $.getScript("/res/js/player.js");
        });
        $('subitem-listen').removeClass("inactive");
        $('subitem-listen').addClass("active");
        window.history.replaceState("Test", "Title", "/listen");
        curr_loaded = "LISTEN";
        rehighlight_sidebar();

        document.getElementById("navtitle").innerHTML = 'Listen';
        document.title = 'Listen'; 
    } else if (oldURL.includes('misc')) {
        console.log("Coming from refresh / back / direct link");
        $('#text-content-holder').load('/misc.html > #text-content');
        $('subitem-misc').removeClass("inactive");
        $('subitem-misc').addClass("active");
        window.history.replaceState("Test", "Title", "/misc");
        curr_loaded = "MISC";
        rehighlight_sidebar();
        document.getElementById("navtitle").innerHTML = 'Miscellaneous';
        document.title = 'Miscellaneous';
    } else if (oldURL.includes('stories')) {
        console.log("Coming from refresh / back / direct link");
        $('#text-content-holder').load('/listen.html > #text-content', function() {
            $.getScript("/res/js/stories.js");
        });
        $('#text-content-holder').load('/stories.html > #text-content');
        $('subitem-stories').removeClass("inactive");
        $('subitem-stores').addClass("active");
        window.history.replaceState("Test", "Title", "/stories");
        curr_loaded = "STORIES";
        rehighlight_sidebar();
        document.getElementById("navtitle").innerHTML = 'Stories';
        document.title = 'Stories';
    }
    else {
        console.log("Loading first time");
        $('#text-content-holder').load('/home > #text-content');
        $('subitem-home').removeClass("inactive");
        $('subitem-home').addClass("active");
        window.history.replaceState("Test", "Title", "/home");
        curr_loaded = "HOME";
        rehighlight_sidebar();
        document.getElementById("navtitle").innerHTML = 'Home';

        document.title = 'The VJChoir Archives';
    }


}

// sidebar item on click listener 
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('sidebar-ul');
var text_content_item = document.getElementById('text-content');

console.log(ul);
ul.onclick = function (event) {

   
    
    
    var sidebar_items = document.getElementById("sidebar-ul").getElementsByTagName("li");

    var target = getEventTarget(event);
    var item = target.textContent || target.innerText;
    var parent = target.parentElement;
    var li_element = '[object HTMLLIElement]';
    var navbar_title = document.getElementById("navtitle");

    console.log('Clicked on element: ' + parent);
    console.log('Current loaded: ' + curr_loaded);
    console.log("Current item: " + item);
    console.log(navbar_title);

    // checks if a list item is actually clicked (not drop down)
    if (parent == li_element
        && !item.includes("BATCH")
        && !item.includes("SYMPH.")) {

            if($(window).width() > 992) {

            } else {
                $('#sidebar').toggleClass('active');
                $('#content').toggleClass('active');
                $('#sidebarCollapse').toggleClass('active');
            }
        // checks if the item clicked is already loaded
        if (item.includes(curr_loaded)) {

        } else {
            for (var i = 0; i < sidebar_items.length; i++) {
                $(sidebar_items[i]).removeClass("active");
            }
        }

        // switch cases for each item
        if (item.includes("HOME") && curr_loaded != "HOME") {
            $('#text-content-holder').load('/home.html > #text-content');
            parent.classList.add('active');
            window.history.replaceState("Test", "Title", "/home");
            curr_loaded = "HOME";
            navbar_title.innerHTML='Home';
            document.title = 'Home';
            window.scrollTo(0,0); 
        } else if (item.includes("ABOUT") && curr_loaded != "ABOUT") {
            $('#text-content-holder').load('/about.html > #text-content');
            $('#navbar-title').innerHTML = "ABOUT";
            parent.classList.add('active');
            window.history.replaceState("Test2", "Title", "/about");
            curr_loaded = "ABOUT";
            navbar_title.innerHTML='About';
            document.title = 'About';
            window.scrollTo(0,0); 
        } else if (item.includes("LISTEN") && curr_loaded != "LISTEN") {
            $('#text-content-holder').load('/listen.html > #text-content', function() {
                $.getScript("/res/js/player.js");
            });
            parent.classList.add('active');
            window.history.replaceState("Test2", "Title", "/listen");
            curr_loaded = "LISTEN";
            navbar_title.innerHTML='Listen';
            document.title = 'Listen';
            window.scrollTo(0,0); 
        } else if (item.includes("MISC") && curr_loaded != "MISC") {
            $('#text-content-holder').load('/misc.html > #text-content');
            parent.classList.add('active');
            window.history.replaceState("Test2", "Title", "/misc");
            curr_loaded = "MISC";
            navbar_title.innerHTML='Miscellaneous';
            document.title = 'Miscellaneous';
            window.scrollTo(0,0); 
        } else if (item.includes("STORIES") && curr_loaded != "STORIES") {
            $('#text-content-holder').load('/stories.html > #text-content', function() {
                $.getScript("/res/js/stories.js");
            });
            parent.classList.add('active');
            window.history.replaceState("Test2", "Title", "/stories");
            curr_loaded = "STORIES";
            navbar_title.innerHTML='Stories';
            document.title = 'Stories';
            window.scrollTo(0,0); 
        } else if (parent.parentElement.id.includes("batch-submenu")) {
            // for batches
            curr_loaded = "BATCHES";
            parent.parentElement.parentElement.classList.add('active');
        } else if (parent.parentElement.id.includes("sov-submenu")) {
            // for sov
            curr_loaded = "SYMPH OF VOICES";   
            parent.parentElement.parentElement.classList.add('active');
        } 
    } else { }

    


};

// handling items with submenu
var sov_array = ["2018", "2017", "2016", "2015", "2014", "2013", "2012"];
var sov_title_array = ["SOV2018", "SOV2017", "SOV2016", "SOV2015", "SOV2014", "SOV2013", "SOV2012"];
document.getElementById("sov-submenu").addEventListener("click", function(e) {
    console.log(e.target.id + "Submenu clicked!");
    var new_link = "/sov/" + sov_array[e.target.id];
    $('#text-content-holder').load(new_link + ' > #text-content');
    window.history.replaceState("Test2", "Title", new_link);
    document.title = sov_title_array[e.target.id];
    document.getElementById("navtitle").innerHTML = sov_title_array[e.target.id];
    window.scrollTo(0,0); 
});

var batch_array = ["1819", "1718", "1617", "1516", "1415", "1314"];
var batch_title_array = ["Batch of 2018 - 2019", "Batch of 2017 - 2018", "Batch of 2016 - 2017", "Batch of 2015 - 2016",
                            "Batch of 2014 - 2015", "Batch of 2013 - 2014"];
document.getElementById("batch-submenu").addEventListener("click", function(e) {
    console.log(e.target.id + " Submenu clicked!");
    var new_link = "/batches/" + batch_array[e.target.id];
    console.log(new_link);
    $('#text-content-holder').load(new_link + ' > #text-content', function() {
        $.getScript("/res/js/batches.js");
    });
    window.history.replaceState("Test2", "Title", new_link);
    document.title = batch_title_array[e.target.id]
    document.getElementById("navtitle").innerHTML = batch_title_array[e.target.id];
    window.scrollTo(0,0);
});

// menu button on click handler
function rehighlight_sidebar() {

    // Setting selected sidebar item based on name of curr_loaded
    var subitem_suffixes = ['home', 'about', 'batches', 'SOV', 'listen', 'stories', 'misc'];
    var currloaded_array = ['HOME', 'ABOUT', 'BATCHES', 'SYMPH OF VOICES', 'LISTEN', 'STORIES', 'MISC'];
    var subitem_end = 'home';
    for(var i = 0; i < currloaded_array.length; i ++) {
        if(currloaded_array[i].includes(curr_loaded)) {
            subitem_end = subitem_suffixes[i];
            break;
        }
    }

    var sidebar_ul = document.getElementById("sidebar-ul");
    var sidebar_items = sidebar_ul.getElementsByTagName("li");
    var curr_subitem = "subitem-" + subitem_end;
        console.log("Found subitem: " + curr_subitem);

    for (var i = 0; i < sidebar_items.length; i++) {
        if (sidebar_items[i].id.includes(curr_subitem)) {
            console.log(sidebar_items[i]);
            $(sidebar_items[i]).addClass("active");
            break;
        } else {

        }
    }
}



$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        console.log('Clicked on sidebar expandable item.');
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
        $(this).toggleClass('active');

    });

    init();
});


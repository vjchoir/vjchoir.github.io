console.log("Loading sidebar.js...");

var MENU_ITEMS = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/res/content/menu.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var curr_selected = null;
var curr_index = null;
var menu_ids = null;
var oldURL = document.referrer;
var isDark = false;

$(document).ready(function() {
    createMenu();
    initDarkMode();
});

function createMenu() {
    // initialising the variables
    if(menu_ids == null) menu_ids = []; 
    
    // creating the menu
    for(let i = 0; i < MENU_ITEMS.items.length; i ++) {
        let item = MENU_ITEMS.items[i];
        let menuItemHTML = "";
        let menuId = MENU_ITEMS.tag + "-" + item.tag;
        let upperCaseTitle = item.title.toUpperCase();

        if(item.subitems.length <= 0) {
            subMenuId = "submenu-" + item.tag; 
            menuItemHTML = `<li id="${menuId}">
                <a id="${subMenuId}">
                    <i class="material-icons">${item.icon}</i>
                    ${upperCaseTitle}
                </a>
            </li>`;

            console.log(menuItemHTML);
            $("#sidebar-ul").append(menuItemHTML);

            $("#" + subMenuId).click(function() {
                clickEvent(menuId, item, true);
            });
        } else {
            subMenuId = "submenu-" + item.tag; 
            menuItemHTML = `<li id="${menuId}"">
                <a href="#${subMenuId}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <i class="material-icons">${item.icon}</i>
                    ${upperCaseTitle}
                </a>
                <ul class="collapse list-unstyled" id="${subMenuId}">

                </ul>
            </li>`;

            console.log(menuItemHTML);
            $("#sidebar-ul").append(menuItemHTML);

            $("#" + subMenuId).click(function() {
                clickEvent(menuId, item, true);
            });

            let id = 0;
            for(let sub of item.subitems) {
                console.log("subitem: " + sub.title);
                console.log("Adding above to #" + subMenuId);
                let subItemHTML = "";
                subItemHTML = `<li>
                    <a id="${subMenuId}-${id}">${sub.title}</a>
                </li>`;
                $("#" + subMenuId).append(subItemHTML);
                id ++;
            }
        }

        menu_ids.push(menuId);
    }

    initContent();

    // Handling the open close sidebar button
    $(".navbar-holder").on("click", "#sidebarCollapse", function () {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("active");
        
        $(".collapse.in").toggleClass("in");
        
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
}

function initDarkMode() {
    if(localStorage.getItem("vjchoir.isDarkMode") == "true") {
        console.log("It's getting dark!");
        toggleDarkMode();
    } else {
        console.log("It's not dark!");
    }

    $("#night-mode-switch").change(function() {
        toggleDarkMode();
    });
}

function initContent() {
    console.log(oldURL);
    let prev = MENU_ITEMS.items[0];
    for(let i = 0; i < MENU_ITEMS.items.length; i ++) {
        if(oldURL.includes(MENU_ITEMS.items[i].tag)) {
            prev = MENU_ITEMS.items[i];
            break;
        }
    }
    // handling the case where you first load up the website
    if(curr_selected == null) {
        curr_selected = prev;
        clickEvent(`menu-${prev.tag}`, prev, false);
    }
}

function clickEvent(menuItemId, item, isClick) {
    console.log("Clicked on " + menuItemId);
    for(let id of menu_ids) {
        if(id == menuItemId) {
            $("#" + id).addClass("active");
        } else {
            $("#" + id).removeClass("active");
        }
    }

    $("#nav-title").html(item.title);
    curr_selected = item;
    loadContent(isClick);
    setURL(item.tag);

    if(item.title == "Home") document.title = "The VJChoir Archives";
    else document.title = item.title;
    
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
}

function loadContent(isClick) {
    
    $("#actual-content-holder").load(`${curr_selected.layout} > #actual-content`, function(){
        $.getScript(`${curr_selected.js}`);
    }).hide().show();

    if(isClick) {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("active");
        
        $(".collapse.in").toggleClass("in");
        
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    
    }
}

function toggleDarkMode() {
    let property_array = [
        '--main-bg-colour', 
    '--main-accent-colour', 
    '--main-title-text-colour',
    '--main-text-colour', 
    '--main-text-inv-colour', 
    '--main-bg-text-colour', 
    '--divider-colour', 
    '--uneven-colour'];
    let dark_colour_array = [
        'rgb(35, 7, 18)', 
        'rgb(81, 16, 41)', 
        'white', 
        'white', 
        'black', 
        'rgb(48, 9, 24)', 
        'white', 
        'rgb(255, 255, 255, 0.05)'];
    let light_colour_array = [
        'rgb(128, 27, 66)', 
        'rgb(175, 36, 90)', 
        'black', 'rgb(75, 75, 75)', 
        'white', 
        'white', 
        '#ddd', 
        'rgb(0, 0, 0, 0.05);'];
    
    if(isDark) {
        // switch back to bright
        for(var i = 0; i < property_array.length; i ++) {
            document.documentElement.style.setProperty(property_array[i], light_colour_array[i]);
        }
        isDark = !isDark;
        $("#night-mode").prop("checked", false);

        // other settings
        document.documentElement.style.setProperty("--main-button-hover-colour","var(--main-bg-colour)");
        document.documentElement.style.setProperty("--main-button-colour", "var(--main-accent-colour)");
        document.documentElement.style.setProperty("--volume-colour", "var(--main-accent-colour)");
        document.documentElement.style.setProperty("--volume-bg-colour", "var(--divider-colour)");

        $("#home-header-logo").css("filter", "invert(100%)");
    } else {
        // switch back to dark
        for(var i = 0; i < property_array.length; i ++) {
            document.documentElement.style.setProperty(property_array[i], dark_colour_array[i]);
        }
        isDark = !isDark;
        $("#night-mode").prop("checked", true);

        // other settings
        document.documentElement.style.setProperty("--main-button-hover-colour","white");
        document.documentElement.style.setProperty("--main-button-colour", "white");
        document.documentElement.style.setProperty("--volume-colour", "white");
        document.documentElement.style.setProperty("--volume-bg-colour", "var(--main-accent-colour)");
        
        $("#home-header-logo").css("filter", "invert(0%)");
        
    }

    localStorage.setItem("vjchoir.isDarkMode", isDark);
}
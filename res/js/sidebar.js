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

$(document).ready(function() {
    createMenu();
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
    });

    if(isClick) {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("active");
        
        $(".collapse.in").toggleClass("in");
        
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    
    }
}
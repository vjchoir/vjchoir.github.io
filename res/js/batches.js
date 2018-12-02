console.log("Initialising batches.js...");
var batch = window.location.pathname.split('/')[2];
// function for names in batches
function update_names(batch) {
    var namelist = retrieve_namelist(batch);

    for(var i = 0; i < namelist.length; i ++) {
        var obj = namelist[i];
        var reference = '#' + obj.section + '-namelist';
        var div = $(reference);
        var names = obj.names;
        
        for(var j = 0; j < names.length; j ++) {
            var item = '<p class="choir-member">' + names[j] + '</p>';
            console.log(item);
            div.append(item);
        }
    }
}

function retrieve_namelist(batch) {
    var raw_file = new XMLHttpRequest();
    console.log("Retrieving namelist for batch of... " + batch);
    var file = "../assets/images/batches/" + batch + "/names.txt"
    raw_file.open("GET", file, false);

    var all_text = "nope";

    raw_file.onreadystatechange = function ()
    {
        if(raw_file.readyState === 4)
        {
            if(raw_file.status === 200 || raw_file.status == 0)
            {
                all_text = raw_file.responseText;
            }
        }
    }
    raw_file.send(null);

    var array = JSON.parse(all_text);

    return array;
}

update_names(batch);


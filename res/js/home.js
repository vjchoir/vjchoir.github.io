console.log("Loading home.js...");

$(document).ready(function () { 
        // Set the date we're counting down to
    var countDownDate = new Date("May 22, 2019 19:30:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("sov-countdown").innerHTML = "<b>" + days + " days, " + hours + " hours, "
    + minutes + " minutes and " + seconds + " seconds</b></a>";
    }, 1000);
    
});
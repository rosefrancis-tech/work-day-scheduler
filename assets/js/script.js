// Current Time
var currentTime = moment();
var hourOfTheDay = currentTime.format("ha");

// display today's date in header
$(".currentDay").text(currentTime.format("dddd, MMMM Do"));




// style time-blocks according to the present, past and future times
$(".row").find($(".hour")).each(function() {
    var schedulerTime = $(this).find($(".time-block")).text().trim().toLowerCase();

    if(schedulerTime === hourOfTheDay) {
        $(".row").each(function() {
            $(this).find($(".row")).addClass("present");
        })
    }

    if(schedulerTime < hourOfTheDay) {
        $(".row").each(function() {
            $(this).find($(".row")).addClass("past");
        })
    }

    if(schedulerTime > hourOfTheDay) {
        $(".row").each(function() {
            $(this).find($(".row")).addClass("future");
        })
    }

})


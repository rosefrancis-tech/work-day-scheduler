// Current Time
var currentTime = moment();
var hourOfTheDay = currentTime.format("ha");

// display today's date in header
$(".currentDay").text(currentTime.format("dddd, MMMM Do"));


var index = 0;
// style time-blocks according to the present, past and future times
$(".row").find($(".hour")).each(function() {
    // time displayed in html
    var schedulerTimeText = $(this).find($(".time-block")).text().trim().toLowerCase();
    // convert the scheduler time from string to moment
    var schedulerTime = moment(schedulerTimeText,'ha');
    // select the row for applying styles
    var eventEl = $(".row").find($(".description")).eq(index);

    index++;
    // conditions for comparing current time and scheduler time
    if(moment().isAfter(schedulerTime)) {
        eventEl.addClass("past");
    }
    if(moment().isBefore(schedulerTime)) {
        eventEl.addClass("future");
    }
    if(hourOfTheDay === schedulerTimeText) {
        eventEl.addClass("present");
    }
})


// edit events

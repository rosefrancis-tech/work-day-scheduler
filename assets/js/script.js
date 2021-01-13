// Current Time
var currentTime = moment();
var hourOfTheDay = currentTime.format("ha");

var editedText = "";

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
$(".description").on("click","p", function() {
    
    // get current text 
    var texts = $(this)
    .text()
    .trim();

    // replace column element with a new textarea
    var textInput = $("<textarea>").addClass("text-block").val(texts);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
})

// return to div from text area
$(".description").on("blur","textarea", function() {
    //debugger;
    // get current text 
    var texts = $(this).val();
     
    // recreate the div element
    var textDisplay = $("<p>").addClass("text-block").text(texts);
    $(this).replaceWith(textDisplay);

    // update events in local storage
    

})
var events = {};

var loadevents = function() {

    tasks = JSON.parse(localStorage.getItem("events"));
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!events) {
      events = {events:[]};
    }
};

var saveTasks = function() {

   // save to local storage
    localStorage.setItem("events", JSON.stringify(events));
};

$(".container").on("click", "i", function(){
    
    editedText = $(".description").text;
    console.log(editedText);
    // add events in an array

    events = { task: editedText };
    // save to local storage
    localStorage.setItem("events", JSON.stringify(events));
})


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
$(".description").on("click", function() {
    //debugger;
    // get current text 
    var texts = $(this)
    .text()
    .trim();
    // get current class
    var curClass = $(this)
    .attr("class");

    // replace column element with a new textarea
    var textInput = $("<textarea>").addClass(curClass).val(texts);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
})

// return to div from text area
$(".description").on("blur", function() {
    //debugger;
    // get current text 
    var texts = $("<textarea>").val();
    // get current class
    var curClass = $("<textarea>")
    .attr("class");
    
    // recreate the div element
    var textDisplay = $("<p>").addClass(curClass).text(texts);
    $("<textarea>").replaceWith(textDisplay);

    // update events in local storage

})

$(".container").on("click", "i", function(){
    
    editedText = $(".description").value;
    console.log(editedText);
    // add events in an array

    events = { task: editedText };
    // save to local storage
    localStorage.setItem("events", JSON.stringify(events));
})


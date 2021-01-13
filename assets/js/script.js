// Global variables
var currentTime = moment();
var hourOfTheDay = currentTime.format("ha");
var events = [];
var currentEvents = [];
var eventObj = {};


// display today's date in header
$(".currentDay").text(currentTime.format("dddd, MMMM Do"));

// INITIAL LOAD events and appropriate color coding
var index1 = 0;
// style time-blocks according to the present, past and future times
$(".row").find($(".hour")).each(function() {
    // time displayed in html
    var schedulerTimeText = $(this).find($(".time-block")).text().trim().toLowerCase();
    // convert the scheduler time from string to moment
    var schedulerTime = moment(schedulerTimeText,'ha');
    // select the row for applying styles
    var eventEl = $(".row").find($(".description")).eq(index1);

    index1++;
    // conditions for comparing current time and scheduler time
    if(moment().isAfter(schedulerTime)) {
        eventEl.addClass("past");
    }
    if(moment().isBefore(schedulerTime)) {
        eventEl.addClass("future");
    }
    if(hourOfTheDay === schedulerTimeText) {
        eventEl.addClass("present").removeClass("past");
    }

    currentEvents = JSON.parse(localStorage.getItem("events"));
    $.each(currentEvents, function(index,value) {
        if(schedulerTimeText === value.timeBlock) {
            eventEl.find("p").text(value.textBlock);
        }
    });

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

// unfocus and save if away from editing
$(".description").on("blur","textarea", function() {
    
    // get current text 
    var texts = $(this).val();
    var currentTimeBlock = $(this)
                            .closest(".description")
                            .prev(".hour")
                            .children(".time-block")
                            .text()
                            .trim()
                            .toLowerCase();
    // add current edited event and corresponding time-block as object
    eventObj = {
        timeBlock: currentTimeBlock,
        textBlock: texts
    } 
    // recreate the p element
    var textDisplay = $("<p>").addClass("text-block").text(texts);
    $(this).replaceWith(textDisplay);
})

// save to local storage when save icon is clicked
$(".container").on("click", "i", function(){
    currentEvents = JSON.parse(localStorage.getItem("events"));
    
    if(currentEvents != null) {
        for(var j=0; j < currentEvents.length; j++){
            // if local storage has values for same timeblock, then remove it
            if(currentEvents[j].timeBlock === eventObj.timeBlock) {
                currentEvents.splice(j,1);
                break;
            }
        }
        currentEvents.push(eventObj);
        events = currentEvents;
    }
    else {
        events.push(eventObj);     
    }
    saveTasks();
})

// function for saving to local storage
var saveTasks = function() {  
    localStorage.setItem("events", JSON.stringify(events));
};
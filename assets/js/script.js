// Global variables
var currentTime = moment();
var hourOfTheDay = currentTime.format("ha");
var events = [];
var currentEvents = [];
var eventObj = {};

// Display today's date in header
$(".currentDay").text(currentTime.format("dddd, MMMM Do"));

// INITIAL load events and appropriate color coding
var index1 = 0;
// Style time-blocks according to the present, past and future times
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
    // load saved events to intial page
    currentEvents = JSON.parse(localStorage.getItem("events"));
    $.each(currentEvents, function(index,value) {
        if(schedulerTimeText === value.timeBlock) {
            eventEl.find("p").text(value.textBlock);
        }
    });
});

// Function for edit events on click
$(".description").on("click","p", function() {
    
    // get current text 
    var texts = $(this)
    .text()
    .trim();
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("text-block").val(texts);
    $(this).replaceWith(textInput);
    // auto focus new element
    textInput.trigger("focus");
});

// Function for unfocus and show as not saved if away from editing
$(".description").on("blur","textarea", function() {
    
    // get current text 
    var texts = $(this).val();
    // remove textarea, recreate the p element, show as not saved
    var textDisplay = $("<p>").addClass("text-block not-saved").text(texts);
    $(this).replaceWith(textDisplay);
});

// Function for save-icon click
$(".row").on("click", "i", function(){
    
    // get the values of current event text and corresponding time-block
    var currentTimeBlock = $(this)
        .closest(".row")
        .find($(".time-block"))
        .text()
        .trim()
        .toLowerCase();
    var currentTextBlock = $(this)
        .closest(".row")
        .find($(".text-block"))
        .text().trim();
    // keep current edited event text and corresponding time-block as object
    eventObj = {
        timeBlock: currentTimeBlock,
        textBlock: currentTextBlock
    };
    // get events from local storage
    currentEvents = JSON.parse(localStorage.getItem("events"));
    // condition for any values in local storage
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
    // remove dotted border on saving
    $(this).closest(".saveBtn").prev(".description").children(".text-block").removeClass("not-saved");
    saveTasks();
});

// Function for clicking Trash icon
$(".clear-all").on("click", function() {
    localStorage.clear();
    location.reload();
});

// Function for saving to local storage
var saveTasks = function() {  
    localStorage.setItem("events", JSON.stringify(events));
};
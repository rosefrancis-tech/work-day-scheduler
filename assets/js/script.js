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
});

// unfocus and save if away from editing
$(".description").on("blur","textarea", function() {
    
    // get current text 
    var texts = $(this).val();
    //console.log($(this));
    /*
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
    } */
    // recreate the p element, show as not saved
    var textDisplay = $("<p>").addClass("text-block not-saved").text(texts);
    $(this).replaceWith(textDisplay);
});

// save to local storage when save icon is clicked
$(".row").on("click", "i", function(){
  
      // debugger;
        console.log($(this));
    var currentTimeBlock = $(this).closest(".row").find($(".time-block")).text().trim().toLowerCase();
    var currentTextBlock = $(this)
        .closest(".row")
        .find($(".text-block"))
        .text().trim();
        console.log(currentTextBlock);
        console.log(currentTimeBlock);
    // add current edited event and corresponding time-block as object
    eventObj = {
        timeBlock: currentTimeBlock,
        textBlock: currentTextBlock
    };
    //debugger;
    console.log("eventobj" + eventObj);
    currentEvents = JSON.parse(localStorage.getItem("events"));
    console.log("storage" +currentEvents);
    if(currentEvents != null) {
        for(var j=0; j < currentEvents.length; j++){
            // if local storage has values for same timeblock, then remove it
            if(currentEvents[j].timeBlock === eventObj.timeBlock) {
                currentEvents.splice(j,1);
                console.log("splice storage" +currentEvents);
                break;
            }
        }
        currentEvents.push(eventObj);
        console.log("after push" + currentEvents);
        events = currentEvents;
        console.log("events with storage" + events);
    }
    else {
        events.push(eventObj); 
        console.log("events without storage" + events);    
    }
    // remove dotted border on saving
    $(this).closest(".saveBtn").prev(".description").children(".text-block").removeClass("not-saved");
    saveTasks();
})

// function for clicking clear all icon
$(".clear-all").on("click", function(){
    localStorage.clear();
    location.reload();
})

// function for saving to local storage
var saveTasks = function() {  
    localStorage.setItem("events", JSON.stringify(events));
    location.reload();
};
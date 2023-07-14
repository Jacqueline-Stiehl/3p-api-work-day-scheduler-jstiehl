// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currHour = dayjs().format("H");

  function showTime() {
    const timer = setInterval(function () {
      $("#currentDay").text(dayjs().format("MMMM DD, YYYY"));
    });
  }
  showTime();

  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function (event) {
    event.preventDefault();
  });

  $("#description").text.val;

  // //need help with saving text onto calendar
  var containerDiv = $(".container-lg"); //delegate event listener to parent element

  containerDiv.on("click", function (event) {
    event.preventDefault();
    // const tasksFromStorage = localStorage.getItem(task);
    // const parsedTasks = JSON.parse(tasksFromStorage);
    // if (tasksFromStorage === null) {
    //   localStorage.setItem(parsedTasks, "");
    // }

    // function saveTask(event) {
    //   event.preventDefault();
    //   var task = $('input[name="#task-"]').val();
    //   //console.log(task);
    // }

    //code from Gary 7/13/23
    const allHours = [
      { id: 8, name: "8AM" },
      { id: 9, name: "9AM" },
      { id: 10, name: "10AM" },
      { id: 11, name: "11AM" },
      { id: 12, name: "12PM" },
      { id: 1, name: "1PM" },
      { id: 2, name: "2PM" },
      { id: 3, name: "3PM" },
      { id: 4, name: "4PM" },
      { id: 5, name: "5PM" },
    ];

    const stringifiedTimes = JSON.stringify(allHours);
    localStorage.setItem("myHours", stringifiedTimes);

    const timesFromStorage = localStorage.getItem("myHours");
    const parsedtimes = JSON.parse(timesFromStorage);
    console.log(parsedtimes);

    //how to store an array of objects in local storage
    //I added below on 7-13-23:
    // var hour = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18",]
    // var hourly = {time: ${i}}

    //from tutor:
    console.log("Save button works");

    // const stringifiedTasks = JSON.stringify(saveTask);
    // localStorage.setItem(task, stringifiedTasks); //(time, value)

    // const tasksFromStorage = localStorage.getItem(task);
    // const parsedTasks = JSON.parse(tasksFromStorage);
    // if (tasksFromStorage === null) {
    //   localStorage.setItem(task, "");
    // }

    // saveTask();
  });

  //checks time and color codes rows according to past, present, future color scheme
  for (var i = 8; i < 18; i++) {
    var time;
    if (i < 12) {
      time = i + "AM";
    } else if (i == 12) {
      time = i + "PM";
    } else {
      time = i - 12 + "PM";
    }
    containerDiv.append(
      $(`<div id="hour-${i}" class="row time-block past">
  <div class="col-2 col-md-1 hour text-center py-3">${time}</div>
  <textarea id="task" class="col-8 col-md-10 description" rows="3"></textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`) //I added id "task" to textarea
    );
  }

  var textarea = $(".description");
  console.log(textarea);
  localStorage.setItem(timeBlocks, textarea.val());

  //I added this 7/13/23
  // var textarea = `#hour-${i}"`;
  // console.log(textarea);

  // create a variable to hold an array of all the divs with class of time-block
  var timeBlocks = $(".time-block");
  // loop over the array of all time blocks to update styling
  for (var i = 0; i < timeBlocks.length; i++) {
    // use jQuery to select an item from the array, then grab the id from the div
    var id = $(timeBlocks[i]).attr("id");
    // split the id string so that we only want the integer part after 'hour-', then convert to an integer data type
    var hour = parseInt(id.split("hour-")[1]);
    console.log(hour);
    console.log(currHour);
    // update classes of div to reflect how the associated time compares with the current hour
    if (hour > currHour) {
      // add and remove classes to div that we are currently working with in the loop
      $(timeBlocks[i]).addClass("future"); //{change color to future
      $(timeBlocks[i]).removeClass("past present");
    } else if (hour == currHour) {
      $(timeBlocks[i]).addClass("present"); //{change color to present
      $(timeBlocks[i]).removeClass("past future");
    } else {
      $(timeBlocks[i]).addClass("past");
      $(timeBlocks[i]).removeClass("present future");
    } //change color to past}
  }

  // $(timeBlocks).each(function(){
  //var timeBlockTask = $(timeBlocks).children().text(${i});
  //   console.log(timeBlockTask);
  // })
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  //use on for listener event:
  // alertButtonEl.on("click", function(event) {
  //   Console.log($(this).attr("style", "display", "none"))});

  // Done--TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Done--TODO: Add code to display the current date in the header of the page.

  // Done--GIVEN I am using a daily planner to create a schedule
  // Done--WHEN I open the planner
  // Done--THEN the current day is displayed at the top of the calendar
  // Done--WHEN I scroll down
  // Done--THEN I am presented with timeblocks for standard business hours
  // Done--WHEN I view the timeblocks for that day
  // Done--THEN each timeblock is color coded to indicate whether it is in the past, present, or future
  // Done--WHEN I click into a timeblock
  // Done--THEN I can enter an event
  // WHEN I click the save button for that timeblock
  // THEN the text for that event is saved in local storage
  // WHEN I refresh the page
  // THEN the saved events persist

  // Hint for HW: is current time > or < some other time?
  // DayJS object stores current day, hour, min, second
});

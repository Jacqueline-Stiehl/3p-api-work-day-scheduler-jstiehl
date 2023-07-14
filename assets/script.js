$(function () {
  var currHour = dayjs().format("H");

  function showTime() {
    const timer = setInterval(function () {
      $("#currentDay").text(dayjs().format("MMMM DD, YYYY"));
    });
  }
  showTime();

  var containerDiv = $(".container-lg");

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
  <textarea class="col-8 col-md-10 description" rows="3"></textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`)
    );
  }

  // create a variable to hold an array of all the divs with class of time-block
  var timeBlocks = $(".time-block");
  // loop over the array of all time blocks to update styling
  for (var i = 0; i < timeBlocks.length; i++) {
    // use jQuery to select an item from the array, then grab the id from the div
    var id = $(timeBlocks[i]).attr("id");
    // split the id string so that we only want the integer part after 'hour-', then convert to an integer data type
    var hour = parseInt(id.split("hour-")[1]);
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
    var task = localStorage.getItem(i);
    $(timeBlocks[i]).children("textarea").val(task);
  }

  $(timeBlocks).each(function (index, timeBlock) {
    var button = $(timeBlock).children("button");

    $(button).on("click", function () {
      var timeBlockTask = $(timeBlock).children("textarea").val();

      localStorage.setItem(index, timeBlockTask);
    });
  });
});

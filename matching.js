$(function () {
  let incorrectTries = 0;
  let currentLine = null;

  $(".draggable").draggable({
    revert: "invalid", // Ensure it reverts if not dropped on a valid target
    helper: "clone", // Use a clone as a drag helper
    start: function (event, ui) {
      // Start line from the center of the draggable element
      let startPos = $(this).offset();
      startPos.top += $(this).outerHeight() / 2;
      startPos.left += $(this).outerWidth() / 2;
      currentLine = createLine(
        startPos.left,
        startPos.top,
        event.pageX,
        event.pageY
      );
    },
    drag: function (event, ui) {
      // Update line to follow the mouse
      updateLine(currentLine, event.pageX, event.pageY);
    },
    stop: function () {
      // Remove line if the drag does not end on a valid drop target
      if (currentLine) {
        $(currentLine).remove();
      }
    },
  });

  $("#columnB li").droppable({
    accept: ".draggable",
    tolerance: "intersect", // Ensures a significant portion of the draggable has to overlap the droppable
    drop: function (event, ui) {
      let targetPos = $(this).offset();
      targetPos.top += $(this).outerHeight() / 2;
      targetPos.left += 10; // Small adjustment to ensure line connects nicely to the edge
      if (ui.draggable.attr("id") === $(this).data("match")) {
        updateLine(currentLine, targetPos.left, targetPos.top, true, "green");
        $(this).append('<div class="text-success">Correct!</div>'); // Append correct text to column B item
      } else {
        updateLine(currentLine, targetPos.left, targetPos.top, true, "red");
        $(this).append('<div class="text-danger">Incorrect!</div>'); // Append incorrect text to column B item
        incorrectTries++;
        if (incorrectTries >= 3) {
          alert("Too many incorrect attempts! Resetting game...");
          setTimeout(function () {
            location.reload(); // Reload the page to restart the game
          }, 2000);
        }
      }
    },
  });

  function createLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    $(line).attr({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: "black",
      "stroke-width": 2,
    });
    $("#svg").append(line);
    return line;
  }

  function updateLine(line, x2, y2, finalize = false, color = "black") {
    $(line).attr({
      x2: x2,
      y2: y2,
      stroke: color, // Set the color based on correctness
    });
    if (finalize) {
      currentLine = null; // Reset currentLine after a successful drop
    }
  }
});

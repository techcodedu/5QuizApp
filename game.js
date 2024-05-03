// Selecting all draggable elements and placeholders
const draggableElements = document.querySelectorAll(".draggable");
const placeholders = document.querySelectorAll(".placeholder");

// Randomize the draggable elements at the start
window.onload = function () {
  const container = document.querySelector(".milestones");
  let items = Array.from(container.children);
  items.sort(() => Math.random() - 0.5);
  items.forEach((item) => container.appendChild(item));
};

// Adding event listeners to draggable elements
draggableElements.forEach((element) => {
  element.addEventListener("dragstart", dragStart);
});

// Adding drag over and drop event listeners to placeholders
placeholders.forEach((placeholder) => {
  placeholder.addEventListener("dragover", dragOver);
  placeholder.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function dragOver(event) {
  event.preventDefault(); // Necessary to allow dropping
}

function drop(event) {
  event.preventDefault();
  const draggableId = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(draggableId);
  const correctGeneration = draggableElement.dataset.generation;

  const dropTarget = event.target.closest(".placeholder");
  if (dropTarget) {
    if (dropTarget.id !== correctGeneration) {
      let tries = parseInt(draggableElement.dataset.tries) || 0;
      tries++;
      draggableElement.dataset.tries = tries;
      if (tries >= 2) {
        alert("Game will reset now.");
        setTimeout(() => location.reload(), 2000);
      } else {
        alert("Incorrect, try again! You have " + (2 - tries) + " tries left.");
      }
      return; // Exit the function to prevent incorrect drop
    }
    dropTarget.appendChild(draggableElement); // Append directly to the correct placeholder
    dropTarget.style.borderColor = "lightgreen"; // Adjust border color
    dropTarget.style.borderWidth = "2px"; // Adjust border width
    draggableElement.style.width = ""; // Reset any previous width settings
    draggableElement.style.height = "70%"; // Set height to fit within placeholder

    // Check if all images are in the correct timeline
    const allCorrect = Array.from(placeholders).every((placeholder) => {
      const generation = placeholder.querySelector(".draggable");
      return generation && generation.dataset.generation === placeholder.id;
    });

    if (allCorrect) {
      alert("Congratulations! You got all correct.");
      if (confirm("Would you like to play again?")) {
        // Reload the page to reset the game
        location.reload();
      }
    }
  }
}

 
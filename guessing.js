const questions = [
  {
    question:
      "5G offers significantly lower _______ compared to previous mobile network generations. This means faster reactions for things like gaming or controlling machinery remotely.",
    answer: "latency",
  },
  {
    question:
      "One key area where 5G excels is in supporting massive numbers of connected devices, also known as the _______ of Things.",
    answer: "internet",
  },
  {
    question:
      "5G utilizes a wider range of _______ to deliver incredibly fast speeds, expanding beyond what was possible with earlier mobile technology.",
    answer: "radio frequencies (or radio spectrum)",
  },
  {
    question:
      "_______ slicing is a 5G feature that allows operators to create separate virtual networks on the same infrastructure, each tailored to specific needs.",
    answer: "network",
  },
  {
    question:
      "5G enables new advancements in _______ reality and _______ reality, offering more immersive and interactive experiences that rely on its speed and low latency.",
    answer: "augmented, virtual",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let incorrectTries = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById("question-container").innerHTML =
      "<h3>Game over! Final score: " + score + "</h3>";
    return;
  }
  const currentQuestion = questions[currentQuestionIndex];
  const hint = `${currentQuestion.answer.charAt(
    0
  )}...${currentQuestion.answer.slice(-1)}`;
  const html = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Question ${currentQuestionIndex + 1}</h5>
                <p class="card-text">${currentQuestion.question}</p>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="answer" placeholder="Enter your answer" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="checkAnswer()">Submit</button>
                    </div>
                </div>
                <p>Hint: <span id="hint">${hint}</span></p>
                <div id="feedback"></div>
            </div>
        </div>
    `;
  document.getElementById("question-container").innerHTML = html;
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
  const feedback = document.getElementById("feedback");
  if (userAnswer === correctAnswer) {
    feedback.innerHTML = `<span class="text-success"><i class="fas fa-check"></i> Correct!</span>`;
    score++;
    document.getElementById("current-score").innerText = score;
    incorrectTries = 0; // Reset incorrect tries on a correct answer
    setTimeout(() => {
      currentQuestionIndex++;
      displayQuestion();
    }, 1000);
  } else {
    incorrectTries++;
    feedback.innerHTML = `<span class="text-danger">Incorrect, try again.</span>`;
    if (incorrectTries >= 3) {
      feedback.innerHTML += `<p>Too many incorrect attempts! Resetting game...</p>`;
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  }
}

function resetGame() {
  shuffleArray(questions); // Randomize questions
  currentQuestionIndex = 0;
  score = 0;
  incorrectTries = 0;
  document.getElementById("current-score").innerText = 0;
  displayQuestion();
}

document.addEventListener("DOMContentLoaded", function () {
  shuffleArray(questions); // Randomize questions initially
  displayQuestion();
});

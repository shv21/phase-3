// Quiz questions data
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheet",
      "Cascading Style Sheets",
      "Computer Style System",
      "Colorful Style Sheet"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which language makes websites interactive?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: "JavaScript"
  },
  {
    question: "Which method is used to select an element by id?",
    options: [
      "querySelectorAll()",
      "getElementById()",
      "addEventListener()",
      "push()"
    ],
    answer: "getElementById()"
  },
  {
    question: "Which event is used for button click?",
    options: ["hover", "submit", "click", "change"],
    answer: "click"
  },
  
];

// Select HTML elements
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");

const questionText = document.querySelector("#question");
const optionsBox = document.querySelector("#options");
const progressText = document.querySelector("#progress");
const scoreText = document.querySelector("#score-text");

// Track quiz state
let currentQuestionIndex = 0;
let score = 0;

// Start quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");

  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}

// Show question
function showQuestion() {
  optionsBox.innerHTML = "";

  let currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQuestion.options.forEach(function(option) {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");

    button.addEventListener("click", function() {
      checkAnswer(button, option);
    });

    optionsBox.appendChild(button);
  });
}

// Check answer
function checkAnswer(selectedButton, selectedOption) {
  let correctAnswer = questions[currentQuestionIndex].answer;

  if (selectedOption === correctAnswer) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }

  // Disable all buttons after one answer
  const allOptions = document.querySelectorAll(".option-btn");

  allOptions.forEach(function(btn) {
    btn.disabled = true;

    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  // Move to next question after short delay
  setTimeout(function() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// Show final result
function showResult() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");

  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

// Restart quiz
restartBtn.addEventListener("click", startQuiz);
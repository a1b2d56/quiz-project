const questions = [
    {
      question: "Who was the first President of the USA?",
      options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
      answer: "George Washington"
    },
    {
      question: "In which year did World War II end?",
      options: ["1941", "1945", "1939", "1950"],
      answer: "1945"
    },
    {
      question: "What was the name of the ship that brought the Pilgrims to America?",
      options: ["Mayflower", "Titanic", "Santa Maria", "Beagle"],
      answer: "Mayflower"
    },
    {
      question: "Which ancient civilization built the pyramids?",
      options: ["Romans", "Egyptians", "Greeks", "Mayans"],
      answer: "Egyptians"
    }
  ];
  
  let shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const nextBtn = document.getElementById("next-btn");
  const progressBar = document.getElementById("progress-bar");
  const scoreText = document.getElementById("score-text");
  const timerText = document.getElementById("time");
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  
  function startTimer() {
    timeLeft = 15;
    timerText.textContent = timeLeft;
    clearInterval(timerInterval);
  
    timerInterval = setInterval(() => {
      timeLeft--;
      timerText.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        nextQuestion();
      }
    }, 1000);
  }
  
  function loadQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option");
      button.textContent = option;
      button.onclick = () => checkAnswer(option, button);
      optionsContainer.appendChild(button);
    });
  
    progressBar.style.width = `${
      ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100
    }%`;
  
    // Start timer
    startTimer();
  }
  
  function checkAnswer(selected, button) {
    clearInterval(timerInterval);
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
  
    if (selected === correctAnswer) {
      score++;
      button.classList.add("correct");
      correctSound.play();
    } else {
      button.classList.add("wrong");
      wrongSound.play();
    }
  
    setTimeout(nextQuestion, 800);
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    questionText.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    scoreText.textContent = `You scored ${score} / ${shuffledQuestions.length}`;
  }
  
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  
  nextBtn.addEventListener("click", loadQuestion);
  
  loadQuestion();
  
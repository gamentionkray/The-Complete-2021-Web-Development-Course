let playing = false;
let score;
let action;
let timeRemaining;
let correctAns;

document.querySelector("#startreset").addEventListener("click", () => {
  if (playing === true) {
    location.reload();
  } else {
    playing = true;
    score = 0;
    timeRemaining = 60;

    addInnerHTML("#scorevalue", score);
    show("#timeremaining", "block");
    addInnerHTML("#timeremainingvalue", timeRemaining);
    hide("#gameOver");
    addInnerHTML("#startreset", "Reset Game");

    startCountdown();
    generateQA();

    for (i = 1; i < 5; i++) {
      document.querySelector("#box" + i).addEventListener("click", function () {
        if (playing === true) {
          if (this.innerHTML == correctAns) {
            score++;
            addInnerHTML("#scorevalue", score);
            show("#correct", "block");
            hide("#wrong");
            setTimeout(() => {
              hide("#correct");
            }, 1000);
            generateQA();
          } else {
            show("#wrong", "block");
            hide("#correct");
            setTimeout(() => {
              hide("#wrong");
            }, 1000);
          }
        }
      });
    }
  }
});

function startCountdown() {
  action = setInterval(function () {
    timeRemaining -= 1;
    addInnerHTML("#timeremainingvalue", timeRemaining);

    if (timeRemaining === 0) {
      stopCountdown();
      show("#gameOver", "flex");
      addInnerHTML(
        "#gameOver",
        `<p>Game Over!</p><p>Your score is ${score}.</p>`
      );
      hide("#timeremaining");
      hide("#correct");
      hide("#wrong");
      playing = false;
      addInnerHTML("#startreset", "Start Game");
    }
  }, 1000);
}

//Functions

function stopCountdown() {
  clearInterval(action);
}

function hide(selector) {
  document.querySelector(selector).style.display = "none";
}

function show(selector, type) {
  document.querySelector(selector).style.display = type;
}

function addInnerHTML(selector, code) {
  document.querySelector(selector).innerHTML = code;
}

function generateQA() {
  let num1 = 1 + Math.round(Math.random() * 9);
  let num2 = 1 + Math.round(Math.random() * 9);
  correctAns = num1 * num2;
  addInnerHTML("#question", `${num1} X ${num2}`);

  let correctPos = 1 + Math.round(Math.random() * 3);
  addInnerHTML(`#box${correctPos}`, correctAns);

  var answers = [correctAns];

  for (i = 1; i < 5; i++) {
    if (i !== correctPos) {
      let wrongAns;
      do {
        wrongAns =
          (1 + Math.round(Math.random() * 9)) *
          (1 + Math.round(Math.random() * 9));
      } while (answers.indexOf(wrongAns) > -1);

      addInnerHTML(`#box${i}`, wrongAns);

      answers.push(wrongAns);
    }
  }
}

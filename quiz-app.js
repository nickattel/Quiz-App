let currentQuestion = 0;
let currentScore = 0;
let currentMissed = 0;
let STORE = [
  {
    question: 'In what year was the first NBA game played?',
    choices: ['1970', '1946', '1965', '1935', '1950'],
    correctAnswer: '1946',
  },
  {
    question: 'What franchise has the most championships in NBA history?',
    choices: ['Lakers', 'Bulls', 'Warriors', 'Celtics', 'Suns'],
    correctAnswer: 'Celtics',
  },
  {
    question: 'What player has the most made 3 point shots in NBA history?',
    choices: ['Stephen Curry', 'Reggie Miller', 'Ray Allen', 'Kobe Bryant', 'Steve Nash'],
    correctAnswer: 'Ray Allen',
  },
  {
    question: 'What NBA player retired for a season, came back after one year, and won a championship?',
    choices: ['Kobe Bryant', 'Larry Bird', 'Shaquille O\'neal', 'Michael Jordan', 'Amare Stoudamire'],
    correctAnswer: 'Michael Jordan',
  },
  {
    question: 'Who was the first player drafted number one overall, out of high school?',
    choices: ['Lebron James', 'Kobe Bryant', 'Kwame Brown', 'Tracy McGrady', 'Larry Bird'],
    correctAnswer: 'Kwame Brown',
  },
  {
    question: 'What year did the NBA first introduce the three point line?',
    choices: ['1960', '1990', '1980', '1970', '2010'],
    correctAnswer: '1980',
  },
  {
    question: 'What NBA player currently has the most missed shots in league history?',
    choices: ['Kobe Bryant', 'Lebron James', 'Michael Jordan', 'Shaquille O\'neal', 'Charles Barkley'],
    correctAnswer: 'Kobe Bryant',
  },
  {
    question: 'Who is the player shown on the logo of the NBA?',
    choices: ['Larry Bird', 'Michael Jordan', 'Jerry West', 'Allen Iverson', 'Magic Johnson'],
    correctAnswer: 'Jerry West',
  },
  {
    question: 'Steve Nash is one of the few players to win MVP but never an NBA championship, how many MVP awards did he win?',
    choices: ['two', 'three', 'one', 'five', 'ten'],
    correctAnswer: 'two',
  },
  {
    question: 'What team has the record for most steals in one season?',
    choices: ['Celtics', 'Lakers', 'Bucks', 'Suns', 'Heat'],
    correctAnswer: 'Suns',
  },
]

function generateQuestion(){
  if (currentQuestion < STORE.length) {
    return `
    <form class="questionBody">
    <fieldset role="radiogroup" aria-labelledby="questionText">
    <legend id="questionText">${STORE[currentQuestion].question}</legend>
    <div class="labelChoices">
    <label class="answerOption">
    <input type="radio" value="${STORE[currentQuestion].choices[0]}" name="answer" required>
    <span>${STORE[currentQuestion].choices[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[currentQuestion].choices[1]}" name="answer" required>
    <span>${STORE[currentQuestion].choices[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[currentQuestion].choices[2]}" name="answer" required>
    <span>${STORE[currentQuestion].choices[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[currentQuestion].choices[3]}" name="answer" required>
    <span>${STORE[currentQuestion].choices[3]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[currentQuestion].choices[4]}" name="answer" required>
    <span>${STORE[currentQuestion].choices[4]}</span>
    </label>
    </div>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    `;
  }
  else {
    renderResults();
    restartQuiz();
    $('.currentQuestion').text(10)
  }
}

function changeQuestionNumber(){
  currentQuestion++;
  $('.currentQuestion').text(currentQuestion+1);
}

function changeScore() {
  currentScore ++;
}

function changeScoreIncorrect() {
  currentMissed ++;
}

function startQuiz(){
  $('.startQuiz').on('click', function(event) {
  $('.homePage').hide();
  $('.quizContainer').show();
  $('.currentQuestion').text(1);
  });
}

function renderQuestion(){
  $('.quizContainer').html(generateQuestion())
}

function selectedAnswer() {
  $('.questionBody').on('submit', function (event){
  event.preventDefault();
  let selected = $('input:checked');
  let answer = selected.val();
  let correctAnswer = `${STORE[currentQuestion].correctAnswer}`;
    if (answer === correctAnswer) {
    selected.parent().addClass('correctAnswer');
    answerIsCorrect();
    } else {
    selected.parent().addClass('wrong');
    answerIsWrong();
    }
  });
}

function answerIsCorrect() {
  goodJobResponse();
  newScoreCorrect();
}

function answerIsWrong() {
  wrongAnswerResponse();
  newScoreIncorrect();
}

function goodJobResponse() {
  let correctAnswer = `${STORE[currentQuestion].correctAnswer}`;
  $('.quizContainer').html(`<div class="answerFeedback"><p><b>That one's a swish! Good job!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function wrongAnswerResponse() {
  let correctAnswer = `${STORE[currentQuestion].correctAnswer}`;
  $('.quizContainer').html(`<div class="answerFeedback"><p><b>That's a miss...</b><br> The correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function newScoreCorrect() {
  changeScore();
  $('.currentScore').text(currentScore);
}

function newScoreIncorrect() {
  changeScoreIncorrect();
  $('.currentMissed').text(currentMissed);
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
  changeQuestionNumber();
  renderQuestion();
  selectedAnswer();
      });
    }

function renderResults () {
  if (currentScore >= 10) {
    $('.quizContainer').html(`<div class="resultsText"><h3>You're the GOAT!</h3><p>You got ${currentScore} / 10</p><p>No one does it better than you!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (currentScore < 10 && currentScore >= 7) {
    $('.quizContainer').html(`<div class="resultsText"><h3>You're an NBA Trivia star!</h3><p>You got ${currentScore} / 10</p><p>Not the best, but better than most!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.quizContainer').html(`<div class="resultsText"><h3>You're on a cold streak.</h3><p>You got ${currentScore} / 10</p><p>Keep up the hard work and you'll be out of this slump in no time!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function main(){
  startQuiz();
  renderQuestion();
  selectedAnswer();
  renderNextQuestion();
}
$(main)

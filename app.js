let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.getElementById("score-board-id");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
const path = window.location.pathname;
const page = path.split("/").pop();




function getCookieProc(){
return document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
}



function getComputerChoice() {
  const choices = ['r', 'p', 's'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter == "r") return "Rock";
  if (letter == "p") return "Paper";
  return "Scissors";

}


function win(userChoise, computerChoice, userChoise_div) {
  let flag = false;
  userScore++;
  document.cookie = `userScore = ${userScore};`
  userScore_span.innerHTML = userScore;
  if(userScore == 69 && flag == false){
    flag = true;
    window.location.replace("nice.html");
  }
  else {
    result_p.innerHTML = `${convertToWord(userChoise)} beats ${convertToWord(computerChoice)}. You win!`;
    userChoise_div.classList.add('green-glow');
    scoreBoard_div.classList.add('green-glow');
    setTimeout(() => userChoise_div.classList.remove('green-glow'), 300);
    setTimeout(() => scoreBoard_div.classList.remove('green-glow'), 500);
  }
}

function lose(userChoise, computerChoice, userChoise_div) {
  computerScore++;
  document.cookie = `computerScore = ${computerScore};`
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(userChoise)} beats ${convertToWord(computerChoice)}. You lose...`;
  userChoise_div.classList.add('red-glow');
  scoreBoard_div.classList.add('red-glow');
  setTimeout(() => userChoise_div.classList.remove('red-glow'), 300);
  setTimeout(() => scoreBoard_div.classList.remove('red-glow'),500);
}

function draw(userChoise, computerChoice, userChoise_div) {
  result_p.innerHTML = `${convertToWord(userChoise)} equals to ${convertToWord(computerChoice)}. draw`;
  userChoise_div.classList.add('grey-glow');
  scoreBoard_div.classList.add('grey-glow');
  setTimeout(() => userChoise_div.classList.remove('grey-glow'), 300);
  setTimeout(() => scoreBoard_div.classList.remove('grey-glow'), 500);
}



function game(userChoise){
  const userChoise_div = document.getElementById(userChoise);
  const computerChoice = getComputerChoice();
  switch (userChoise + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoise, computerChoice, userChoise_div);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoise, computerChoice, userChoise_div);
      break;
      case "rr":
      case "pp":
      case "ss":
        draw(userChoise, computerChoice, userChoise_div);
        break;
    default:

  }
}



function main() {
  if(page == "index.html")
  {
    if(document.cookie){
       userScore = getCookieProc().userScore;
	     userScore_span.innerHTML = userScore;
       computerScore = getCookieProc().computerScore;
       computerScore_span.innerHTML = computerScore;
      }
    rock_div.addEventListener('click', () => game("r"));
    paper_div.addEventListener('click', () => game("p"));
    scissors_div.addEventListener('click', () => game("s"));
  }
  else if (page == "nice.html") {
    setTimeout(() => window.location.replace("index.html"), 1000);
  }

}


main();

'use strict';

/* --- Global Variables --- */

const btnSubmit = document.querySelector('.js-btn-submit');
const btnReset = document.querySelector('.js-btn-reset');
const select = document.querySelector('.js-select');
const result = document.querySelector('.js-result');
const player = document.querySelector('.js-player');
const computer = document.querySelector('.js-computer');
const games = document.querySelector('.js-games');
let guessCount = 0;

/* --- Get Moves & Winner --- */

//Get move from player
function getMovesPlayer() {
  let movePlayer = select.value;
  return movePlayer;
}

//Get move from computer
function getMovesComputer() {
  let randomNumber = getRandomNumber(9);
  let moveComputer = '';
  if (randomNumber <= 3) {
    moveComputer = 'rock';
  } else if (randomNumber >= 7) {
    moveComputer = 'paper';
  } else {
    moveComputer = 'scissors';
  }
  return moveComputer;
}

//Get the winner
function getWinner() {
  let movePlayer = getMovesPlayer();
  let moveComputer = getMovesComputer();
  if (movePlayer === moveComputer) {
    addResult('Jugada: Empate');
  } else if (
    (movePlayer === 'paper' && moveComputer === 'rock') ||
    (movePlayer === 'rock' && moveComputer === 'scissors') ||
    (movePlayer === 'scissors' && moveComputer === 'paper')
  ) {
    addResult('Jugada: ¡Has ganado!');
  } else {
    addResult('Jugada: ¡Has perdido!');
  }
}

//Add Score to the HTML
function addScore() {
  let playerHTML = parseInt(player.innerHTML);
  let computerHTML = parseInt(computer.innerHTML);
  addHTML(games, guessCount);
  if (result.innerHTML === 'Jugada: ¡Has ganado!') {
    addHTML(player, playerHTML + 1)
  } else if (result.innerHTML === 'Jugada: ¡Has perdido!') {
    addHTML(computer, computerHTML + 1)
  }
}

/* --- Event Listener Functions --- */

//Button listener if the player has select the move
function handleBtnSubmitClick(event) {
  event.preventDefault();
  getWinner();
  addScore();
  if (guessCount >= 10) {
    endGame();
  }
}

function listenerBtnSubmit() {
  btnSubmit.addEventListener('click', handleBtnSubmitClick);
}

//Button listener if the player didn't select the move
function handleBtnDisabled(event) {
  event.preventDefault();
  alertPlayer();
}

function listenerBtnDisabled() {
  btnSubmit.addEventListener('click', handleBtnDisabled);
}

//Button listener for reset the game
function handleBtnResetClick(event) {
  event.preventDefault();
  guessCount = 0;
  addHTML(player, 0)
  addHTML(computer, 0)
  addHTML(games, 0)
  addHTML(result, '¡Vamos a jugar!')
  btnSubmit.classList.remove('hidden');
  btnReset.classList.add('hidden');
}

btnReset.addEventListener('click', handleBtnResetClick);

//If you pick the player move
function handleChangeInput() {
  btnSubmit.removeEventListener('click', handleBtnDisabled);
  listenerBtnSubmit();
  select.removeEventListener('change', handleChangeInput);
}

function listenerChangeInput() {
  select.addEventListener('change', handleChangeInput);
}

/* --- Helper Functions --- */

//Can you make the move?
function canYouPlay() {
  let movePlayer = getMovesPlayer();
  if (movePlayer === 'no-move') {
    listenerBtnDisabled();
  }
}

//Generate random number
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

//If the player didn't select the move
function alertPlayer() {
  addHTML(result, 'Selecciona una opción por favor')
}

//Add result and counter
function addResult(text) {
  addHTML(result, text)
  guessCount++;
}

//Paint in the HTML
function addHTML(where, text) {
  where.innerHTML = text
}

//End the game
function endGame() {
  btnReset.classList.remove('hidden');
  btnSubmit.classList.add('hidden');
  let countPlayer = parseInt(player.innerHTML);
  let countComputer = parseInt(computer.innerHTML);
  if (countPlayer > countComputer) {
    addHTML(result, '¡Partida ganada!')
  } else if ((countPlayer === countComputer)) {
    addHTML(result, '¡Partida empatada!')
  } else {
    addHTML(result, '¡Partida perdida!')
  }
}

/* --- Start --- */
canYouPlay();
listenerChangeInput();

"use strict";
//Variables
const btn = document.querySelector('.js-btn');
const select = document.querySelector('.js-select');
const result = document.querySelector('.js-result');
const player = document.querySelector('.js-player');
const computer = document.querySelector('.js-computer');

//Generar número aleatorio
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

//Si el jugador no ha seleccionado nada
function alertPlayer() {
  result.innerHTML = "Selecciona una opción por favor"
}

//Guardar jugada: jugador
function getMovesPlayer() {
  let movePlayer = select.value
  if (movePlayer === "no") {
    alertPlayer()
  } else {
    console.log("Jugador: " + movePlayer)
  }
  return movePlayer
}

//Guardar jugada: ordenador
function getMovesComputer() {
  let randomNumber = getRandomNumber(9)
  let moveComputer = ""
  let movePlayer = getMovesPlayer()
  if (movePlayer === "no") {
    console.log("Selecciona una opción por favor")
    alertPlayer()
  } else if (randomNumber <= 3) {
    console.log("Ordenador: rock - Número aleatorio: " + randomNumber + " (Piedra: 1, 2 o 3)")
    moveComputer = "rock"
  } else if (randomNumber >= 7) {
    console.log("Ordenador: paper - Número aleatorio: " + randomNumber + " (Papel: 7, 8 o 9)")
    moveComputer = "paper"
  } else {
    console.log("Ordenador: scissors - Número aleatorio: " + randomNumber + " (Tijera: 4, 5 o 6)")
    moveComputer = "scissors"
  }
  return moveComputer
}

//Guardar las dos jugadas
function getWinner() {
  let movePlayer = getMovesPlayer()
  let moveComputer = getMovesComputer()
  if (movePlayer === "no") {
    alertPlayer()
  } else if (movePlayer === moveComputer) {
    result.innerHTML = "Empate"
    console.log("Empate")
  } else if ((movePlayer === "paper" && moveComputer === "rock")
    || (movePlayer === "rock" && moveComputer === "scissors")
    || (movePlayer === "scissors" && moveComputer === "paper") ) {
    result.innerHTML = "¡Has ganado!"
    console.log("Has ganado")
  } else {
    result.innerHTML = "¡Has perdido!"
    console.log("Has perdido")
  }
}

//Pintar en el HTML
function addCounter() {
  let playerHTML = parseInt(player.innerHTML)
  let computerHTML = parseInt(computer.innerHTML)
  if (result.innerHTML === "¡Has ganado!") {
    player.innerHTML = playerHTML + 1
  } else if (result.innerHTML === "¡Has perdido!") {
    computer.innerHTML = computerHTML + 1
  }
}

//Manejador del listener del botón
function handleBtnClick(event) {
  event.preventDefault()
  getWinner()
  addCounter()
}


//Listener para el botón
btn.addEventListener("click", handleBtnClick)

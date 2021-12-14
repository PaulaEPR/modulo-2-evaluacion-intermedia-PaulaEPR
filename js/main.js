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

//Manejador del listener del botón
function handleBtnClick(event) {
  event.preventDefault()
  let randomNumber = getRandomNumber(9)
  let movePlayer = select.value
  //let moveComputer = ""
  if (randomNumber <= 3) {
    console.log("Ordenador: " + randomNumber + " (Piedra: 1, 2 o 3)")
  } else if (randomNumber >= 7) {
    console.log("Ordenador: " + randomNumber + " (Papel: 7, 8 o 9)")
  } else {
    console.log("Ordenador: " + randomNumber + " (Tijera: 4, 5 o 6)")
  }

  console.log("Jugador: " + movePlayer)
  console.log("Número aleatorio: " + randomNumber)
}


//Listener para el botón
btn.addEventListener("click", handleBtnClick)

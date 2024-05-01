import {
    insertNumber,
    drawFullGame,
    insertBombs,
    bobmbsInGame,
    gameInit,
} from "./helper.js";

import {
    startTimer,
} from "./timer.js";

import {
    onCellClick,
} from "./events.js";

import {
    rows,
    columns,
    map,
} from "./common.js";

let container = document.querySelector(".container");

for (let i = 0; i < rows; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    container.append(rowDiv);
    for (let j = 0; j < columns; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(`row-${i}-col-${j}`);
        cell.addEventListener('click', onCellClick);
        rowDiv.append(cell);
    }
}



insertBombs(map);
insertNumber(map);
//drawFullGame(map);
gameInit(map);

flags = document.getElementById("flags");
flags.innerHTML = bobmbsInGame;

startTimer();

console.log(map);

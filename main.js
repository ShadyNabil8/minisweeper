import {
    insertNumber,
    drawFullGame,
    insertBombs,
    updateFlags,
    gameInit,
} from "./helper.js";

import {
    startTimer,
} from "./timer.js";

import {
    onLeftClick,
    onRightClick,
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
        cell.addEventListener('click', onLeftClick);
        cell.addEventListener("contextmenu", onRightClick);
        rowDiv.append(cell);
    }
}



insertBombs(map);
insertNumber(map);
gameInit(map);
updateFlags();
startTimer();
console.log(map);


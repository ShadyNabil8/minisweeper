import {
    insertNumber,
    drawFullGame,
    insertBombs,
} from "./helper.js";

let rows = 17;
let columns = 9;

let container = document.querySelector(".container");
let header = (document.createElement("div"));
header.classList.add("header");
header.innerHTML = "Minisweeper";
container.append(header);

for (let i = 0; i < rows; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add(`row-${i}`);
    rowDiv.classList.add("row");
    container.append(rowDiv);
    for (let j = 0; j < columns; j++) {
        let colDiv = document.createElement("div");
        colDiv.classList.add("cell");
        colDiv.classList.add(`row-${i}-col-${j}`);
        rowDiv.append(colDiv);
    }
}

//let map = Array.from({ length: rows }, () => Array(columns).fill("b"));
let map = Array(rows).fill().map(() => Array(columns).fill("block"));

insertBombs(map);
insertNumber(map);
drawFullGame(map);

console.log(map);
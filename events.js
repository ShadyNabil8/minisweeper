import {
    map,
    getGroubInx,
    flagMap,
} from "./common.js";
import {
    updateFlags,
    expectedFlags,
    drawFullGame,
} from "./helper.js";

export function onLeftClick(event) {
    const string = event.target.classList[1];
    const parts = string.split('-'); // Split string by '-' delimiter
    const [x, y] = parts.filter(part => !isNaN(part)).map(Number); // Filter out non-numeric parts and convert them to numbers
    if (flagMap[x][y] != "flag")
        discover(x, y);

}

export function onRightClick(event) {
    event.preventDefault();
    const string = event.target.classList[1];
    const parts = string.split('-'); // Split string by '-' delimiter
    const [x, y] = parts.filter(part => !isNaN(part)).map(Number); // Filter out non-numeric parts and convert them to numbers
    let cell = document.querySelector(`.row-${x}-col-${y}`);
    if (flagMap[x][y] === "empty") {
        cell.style.backgroundImage = `url('./icons/flag.png')`;
        updateFlags(-1);
        flagMap[x][y] = "flag";
    }
    else {
        updateFlags(1);
        cell.style.backgroundImage = `url('./icons/cube.png')`;
        flagMap[x][y] = "empty";
    }
    if (expectedFlags == 0) {
        drawFullGame();
    }
}

function discover(x, y, memo = []) {
    let cell = document.querySelector(`.row-${x}-col-${y}`);
    if (map[x][y] == "obstacle") {
        cell.style.backgroundImage = `url('./icons/obstacle.png')`;
        memo.push(cell);
        const neighbours = getGroubInx(x, y, false);
        neighbours.filter((cor) => {
            let [n_x, n_y] = cor;
            let neighbourCell = document.querySelector(`.row-${n_x}-col-${n_y}`);
            if ((map[n_x][n_y] === "obstacle") && (!memo.includes(neighbourCell))) {
                return true;
            }
            else if (!(map[n_x][n_y] === "obstacle")) {
                neighbourCell.style.backgroundImage = `url('./icons/${map[n_x][n_y]}.png')`;
                return false;
            }
        }).forEach((cor => {
            let [n_x, n_y] = cor;
            discover(n_x, n_y, memo);
        }));
    }
    else if (!(map[x][y] == "bomb")) {
        cell.style.backgroundImage = `url('./icons/${map[x][y]}.png')`
    }
    else {
        map[x][y] = "redbomb"
        drawFullGame();
    }
}
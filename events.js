import {
    map,
    getGroubInx,
} from "./common.js";

export function onCellClick(event) {
    const string = event.target.classList[1];
    const parts = string.split('-'); // Split string by '-' delimiter
    const [x, y] = parts.filter(part => !isNaN(part)).map(Number); // Filter out non-numeric parts and convert them to numbers
    discover(x, y);

}

function discover(x, y, memo = []) {
    let cell = document.querySelector(`.row-${x}-col-${y}`);
    if (map[x][y] == "obstacle") {
        cell.style.backgroundImage = `url('./icons/obstacle.png')`;
        memo.push(cell);
        const neighbours = getGroubInx(x, y, map, false);
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
}
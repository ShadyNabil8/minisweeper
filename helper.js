import {
    maxNeighbourBomb,
    getGroubInx,
    maxNumberBomb,
    probabilityOfInsertion,
    map,
    flagMap,
} from "./common.js";

const numbers = ["one", "two", "three", "four","five"];

export let expectedFlags = 0;

export function getBombNumber(r, c) {
    let bombSurroundGroup = getGroubInx(r, c);
    let bombs = 0;
    bombSurroundGroup.forEach((cell, r) => {
        let [x, y] = cell;
        if (map[x][y] === "bomb") bombs++;
    });
    return bombs;
}

export function insertNumber() {
    map.forEach((cellRow, r) => {
        cellRow.forEach((cell, c) => {
            if (cell === "obstacle") {
                let surroundBombs = getBombNumber(r, c);
                if (surroundBombs != 0) map[r][c] = numbers[surroundBombs - 1];
            }
        });
    });
}

export function insertBombs() {
    map.forEach((cellRow, r) => {
        cellRow.forEach((cell, c) => {
            let willInsert = getOneWithProb(probabilityOfInsertion);
            if ((willInsert === 1) && (checkValidBomb(r, c)) && (expectedFlags < maxNumberBomb)) {
                map[r][c] = "bomb";
                expectedFlags++;
            }
        });
    });
}

export function updateFlags(value = 0) {
    expectedFlags += value;
    flags = document.getElementById("flags");
    flags.innerHTML = expectedFlags;
}


function checkValidBomb(curRow, curCol) {
    let bombSurroundGroup = getGroubInx(curRow, curCol);
    for (let i = 0; i < bombSurroundGroup.length; i++) {
        let [bombR, bombC] = bombSurroundGroup[i];
        if (map[bombR][bombC] === "obstacle") {
            let surroundBombs = 1;
            let blockSurroundGroup = getGroubInx(bombR, bombC);
            for (let j = 0; j < blockSurroundGroup.length; j++) {
                let [blockR, blockC] = blockSurroundGroup[j];
                if (map[blockR][blockC] === "bomb") surroundBombs++;
            }
            if (surroundBombs > maxNeighbourBomb) {
                return false;
            }
        }
        else if (map[bombR][bombC] === "bomb") {
            if (isTrapped(bombR, bombC))
                return false;
        }
    }
    return true;
}



function isTrapped(bombRow, bombCol) {
    let groub = getGroubInx(bombRow, bombCol);
    let surroundBombs = 1;
    for (let i = 0; i < groub.length; i++) {
        let [x, y] = groub[i];
        if (map[x][y] === "bomb") surroundBombs++;
    }
    if (surroundBombs === groub.length) return true;
    else return false;
}

export function drawFullGame() {
    let win = true;
    map.forEach((cellRow, r) => {
        cellRow.forEach((cell, c) => {
            let cellDiv = document.querySelector(`.row-${r}-col-${c}`);
            if ((cell != "bomb") && (flagMap[r][c] === "flag")) {
                win = false;
                cellDiv.style.backgroundImage = `url('./icons/wrongflag.png')`;
            }
            else if (cell === "redbomb") {
                win = false;
                cellDiv.style.backgroundImage = `url('./icons/${cell}.png')`;
            }
            else {
                cellDiv.style.backgroundImage = `url('./icons/${cell}.png')`;
            }
        });
    });
    if (win)
        alert("Congratulation. You win");
    else
        alert("Game over. You lose")
}

export function gameInit() {
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            let cell = document.querySelector(`.row-${r}-col-${c}`);
            cell.style.backgroundImage = "url('./icons/cube.png')";
        }
    }
}


function getOneWithProb(prob) {
    // Generate a random number between 0 and 1
    let randomNumber = Math.random();

    // Check if the random number falls within the desired probability ranges
    if (randomNumber < prob) {
        return 1;
    } else {
        return 0;
    }
}
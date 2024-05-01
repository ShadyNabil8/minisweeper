import {
    maxNeighbourBomb,
    getGroubInx,
    maxNumberBomb,
    probabilityOfInsertion,
    map,
    flagMap,
} from "./common.js";

const numbers = ["one", "two", "three", "four"];

export let expectedFlags = 0;

export function getBombNumber(r, c, map) {
    let bombSurroundGroup = getGroubInx(r, c, map);
    let bombs = 0;
    for (let i = 0; i < bombSurroundGroup.length; i++) {
        let [x, y] = bombSurroundGroup[i];
        if (map[x][y] === "bomb") bombs++;
    }
    return bombs;
}

export function insertNumber(map) {
    let rows = map.length;
    let columns = map[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (map[r][c] === "obstacle") {
                let surroundBombs = getBombNumber(r, c, map);
                if (surroundBombs != 0) map[r][c] = numbers[surroundBombs - 1];
            }
        }
    }
}

export function insertBombs(map) {
    let rows = map.length;
    let columns = map[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let willInsert = getOneWithProb(probabilityOfInsertion);
            if ((willInsert === 1) && (checkValidBomb(map, r, c)) && (expectedFlags < maxNumberBomb)) {
                map[r][c] = "bomb";
                expectedFlags++;
            }
        }
    }
}

export function updateFlags(value = 0) {
    expectedFlags += value;
    flags = document.getElementById("flags");
    flags.innerHTML = expectedFlags;
}


function checkValidBomb(map, curRow, curCol) {
    let bombSurroundGroup = getGroubInx(curRow, curCol, map);
    for (let i = 0; i < bombSurroundGroup.length; i++) {
        let [bombR, bombC] = bombSurroundGroup[i];
        if (map[bombR][bombC] === "obstacle") {
            let surroundBombs = 1;
            let blockSurroundGroup = getGroubInx(bombR, bombC, map);
            for (let j = 0; j < blockSurroundGroup.length; j++) {
                let [blockR, blockC] = blockSurroundGroup[j];
                if (map[blockR][blockC] === "bomb") surroundBombs++;
            }
            if (surroundBombs > maxNeighbourBomb) {
                return false;
            }
        }
        else if (map[bombR][bombC] === "bomb") {
            if (isTrapped(bombR, bombC, map))
                return false;
        }
    }
    return true;
}



function isTrapped(bombRow, bombCol, map) {
    let groub = getGroubInx(bombRow, bombCol, map);
    let surroundBombs = 1;
    for (let i = 0; i < groub.length; i++) {
        let [x, y] = groub[i];
        if (map[x][y] === "bomb") surroundBombs++;
    }
    if (surroundBombs === groub.length) return true;
    else return false;
}

export function drawFullGame() {
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            let cell = document.querySelector(`.row-${r}-col-${c}`);
            if ((map[r][c] != "bomb") && (flagMap[r][c] === "flag")) {
                cell.style.backgroundImage = `url('./icons/wrongflag.png')`;
                alert("Game over. You lose");
            }
            else {
                cell.style.backgroundImage = `url('./icons/${map[r][c]}.png')`;
            }
        }
    }
    alert("Congratulation. You win");
}

export function gameInit(map) {
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
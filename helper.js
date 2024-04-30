let maxBombNumber = 4;
export let bobmbsInGame = 0;

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
                if (surroundBombs != 0) map[r][c] = surroundBombs;
            }
        }
    }
}

export function insertBombs(map) {
    let rows = map.length;
    let columns = map[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let willInsert = getOneWithProb(0.2);
            if ((willInsert === 1) && (checkValidBomb(map, r, c))) {
                map[r][c] = "bomb";
                bobmbsInGame++;
            }
        }
    }
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
            if (surroundBombs > maxBombNumber) {
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

function getGroubInx(curRow, curCol, map) {
    let groub = [];
    for (let r = curRow - 1; r <= curRow + 1; r++) {
        if ((r >= 0) && (r < map.length)) {
            for (let c = curCol - 1; c <= curCol + 1; c++) {
                if ((c >= 0) && (c < map[0].length)) {
                    if (!(r === curRow && c === curCol))
                        groub.push([r, c]);
                }
            }
        }
    }
    return groub;
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

export function drawFullGame(map) {
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            let cell = document.querySelector(`.row-${r}-col-${c}`);
            if (map[r][c] === "obstacle") {
                cell.style.backgroundImage = "url('./obstacle.png')";
            }
            else if (map[r][c] === "bomb") {
                cell.style.backgroundImage = "url('./bomb.png')";
            }
            else if (map[r][c] === 1) {
                cell.style.backgroundImage = "url('./one.png')";
            }
            else if (map[r][c] === 2) {
                cell.style.backgroundImage = "url('./two.png')";
            }
            else if (map[r][c] === 3) {
                cell.style.backgroundImage = "url('./three.png')";
            }
            else if (map[r][c] === 4) {
                cell.style.backgroundImage = "url('./four.png')";
            }
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
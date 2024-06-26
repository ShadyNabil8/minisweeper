export let rows = 17;
export let columns = 9;
export let maxNeighbourBomb = 5;
export let maxNumberBomb = 25;
export let probabilityOfInsertion = 0.2;



//let map = Array.from({ length: rows }, () => Array(columns).fill("b"));
export let map = Array(rows).fill().map(() => Array(columns).fill("obstacle"));

export let flagMap = Array(rows).fill().map(() => Array(columns).fill("empty"));


export function getGroubInx(curRow, curCol, includeCorners = true) {
    let groub = [];
    for (let r = curRow - 1; r <= curRow + 1; r++) {
        if ((r >= 0) && (r < map.length)) {
            for (let c = curCol - 1; c <= curCol + 1; c++) {
                if ((c >= 0) && (c < map[0].length)) {
                    if (!includeCorners) {
                        if ((r === curRow - 1) || (r === curRow + 1)) {
                            groub.push([r, curCol]);
                            break;
                        }
                        else {
                            if (!(r === curRow && c === curCol))
                                groub.push([r, c]);
                        }
                    }
                    else {
                        if (!(r === curRow && c === curCol))
                            groub.push([r, c]);
                    }
                }
            }
        }
    }
    return groub;
}

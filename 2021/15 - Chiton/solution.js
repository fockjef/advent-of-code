/* --- Day 15: Chiton --- */

function silver(expansionFactor = 1) {
    let data = parseInput(x => x.split('').map(Number)),
        cave = function (r, c) {
            let offsetR = (r / data.length) >>> 0,
                offsetC = (c / data[0].length) >>> 0,
                val =
                    data[r % data.length][c % data[0].length] +
                    offsetR +
                    offsetC;
            // does not work for expansionFactor > 5 [ probably a coincidence ;) ]
            return val < 10 ? val : val - 9;
        };
    cave.numRows = data.length * expansionFactor;
    cave.numCols = data[0].length * expansionFactor;
    return findBestPath(cave, {row: cave.numRows - 1, col: cave.numCols - 1});
}

function gold() {
    return silver(5);
}

const neighborhood = [
    [-1, 0], // U
    [1, 0], // D
    [0, -1], // L
    [0, 1] // R
];

// Note: this works, is better than the previous solution, has a LOT of room for improvement
function findBestPath(grid, target) {
    let maxR = grid.numRows,
        maxC = grid.numCols,
        minCost = Array.from(new Array(maxR), x =>
            new Array(maxC).fill(Infinity)
        ),
        queue = [[0, 0]]; // this should really be a priority queue of some sort
    minCost[0][0] = 0;
    while (queue.length) {
        let [r, c] = queue.shift(),
            cost = minCost[r][c];
        for (let n = 0; n < neighborhood.length; n++) {
            let [rr, cc] = neighborhood[n];
            rr += r;
            cc += c;
            if (
                rr >= 0 &&
                cc >= 0 &&
                rr < maxR &&
                cc < maxC &&
                cost + grid(rr, cc) < minCost[rr][cc]
            ) {
                // return target cost here, if using a priority queue
                minCost[rr][cc] = cost + grid(rr, cc);
                queue.push([rr, cc]);
            }
        }
    }
    return minCost[target.row][target.col];
}

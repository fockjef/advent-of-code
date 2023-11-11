/* --- Day 13: A Maze of Twisty Little Cubicles --- */

const hood = [
    [0, -1],
    [-1, 0],
    [1, 0],
    [0, 1]
];

function silver() {
    let favNum = parseInput(Number)[0],
        targetX = 31,
        targetY = 39;
    return walkMaze(favNum, targetX, targetY).get(targetX + ':' + targetY);
}

function gold() {
    let favNum = parseInput(Number)[0],
        maxSteps = 50;
    return walkMaze(favNum, -1, -1, maxSteps).size;
}

function walkMaze(favNum, targetX = 31, targetY = 39, maxSteps = Infinity) {
    let queue = [[1, 1, 0]],
        maze = new Map([['1:1', 0]]);
    while (queue.length) {
        let [x, y, dist] = queue.shift();
        if ((x == targetX && y == targetY) || dist == maxSteps) break;
        hood.forEach(([xinc, yinc]) => {
            let xx = x + xinc,
                yy = y + yinc;
            if (
                xx >= 0 &&
                yy >= 0 &&
                !maze.has(xx + ':' + yy) &&
                isOpen(xx, yy, favNum)
            ) {
                queue.push([xx, yy, dist + 1]);
                maze.set(xx + ':' + yy, dist + 1);
            }
        });
    }
    return maze;
}

function isOpen(x, y, favNum) {
    return (
        (x * x + 3 * x + 2 * x * y + y + y * y + favNum).toString(2).match(/1/g)
            .length %
            2 ==
        0
    );
}

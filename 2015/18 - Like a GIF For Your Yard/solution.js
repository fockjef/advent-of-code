/* --- Day 18: Like a GIF For Your Yard --- */

const hood = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    ,
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

function silver(stuckCorners = false) {
    let grid = parseInput(x => x.split('').map(c => +(c == '#')));
    if (stuckCorners)
        grid[0][0] =
            grid[0][grid[0].length - 1] =
            grid[grid.length - 1][0] =
            grid[grid.length - 1][grid[0].length - 1] =
                1;
    for (let i = 0; i < 100; i++) {
        grid = evolve(grid);
        if (stuckCorners)
            grid[0][0] =
                grid[0][grid[0].length - 1] =
                grid[grid.length - 1][0] =
                grid[grid.length - 1][grid[0].length - 1] =
                    1;
    }
    return grid.map(r => r.filter(Boolean).length).sum();
}

function gold() {
    return silver(true);
}

function evolve(grid) {
    let next = Array.from(
        new Array(grid.length),
        () => new Array(grid[0].length)
    );
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            let numNeigh = hood
                .map(([rInc, cInc]) => {
                    let rr = r + rInc,
                        cc = c + cInc;
                    return rr >= 0 &&
                        rr < grid.length &&
                        cc >= 0 &&
                        cc < grid[0].length
                        ? grid[rr][cc]
                        : 0;
                })
                .sum();
            next[r][c] = +(numNeigh == 3 || (grid[r][c] && numNeigh == 2));
        }
    }
    return next;
}

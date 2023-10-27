/* --- Day 11: Seating System --- */

function silver() {
    function getNeighbors(data, r, c) {
        return [
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1]
        ]
            .filter(
                n =>
                    n[0] >= 0 &&
                    n[0] < data.length &&
                    n[1] >= 0 &&
                    n[1] < data[n[0]].length &&
                    data[n[0]][n[1]] !== '.'
            )
            .map(n => n[0] * data[0].length + n[1]);
    }

    function transitionRule(state, occupied) {
        return (
            (state === 0 && occupied === 0) || (state === 1 && occupied >= 4)
        );
    }

    let grid = initialize(parseInput(), getNeighbors),
        gen = 0;
    while (evolve(grid, gen++, transitionRule)) {}
    return grid.filter(s => s.state[0] === 1).length;
}

function gold() {
    function getNeighbors(data, r, c) {
        return [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ]
            .map(([dR, dC]) => {
                let rr = r + dR,
                    cc = c + dC;
                while (1) {
                    if (
                        rr < 0 ||
                        rr >= data.length ||
                        cc < 0 ||
                        cc >= data[rr].length
                    )
                        return null;
                    if (data[rr][cc] !== '.') return rr * data[0].length + cc;
                    rr += dR;
                    cc += dC;
                }
            })
            .filter(n => n !== null);
    }

    function transitionRule(state, occupied) {
        return (
            (state === 0 && occupied === 0) || (state === 1 && occupied >= 5)
        );
    }

    let grid = initialize(parseInput(), getNeighbors),
        gen = 0;
    while (evolve(grid, gen++, transitionRule)) {}
    return grid.filter(s => s.state[0] === 1).length;
}

function initialize(data, getNeighbors) {
    let grid = new Array(data.length * data[0].length);
    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < data[r].length; c++) {
            if (data[r][c] !== '.') {
                grid[r * data[0].length + c] = {
                    state: [+(data[r][c] === '#'), 0],
                    neigh: getNeighbors(data, r, c)
                };
            }
        }
    }
    return grid;
}

function evolve(grid, gen, transitionRule) {
    let curr = gen % 2,
        next = (gen + 1) % 2,
        numChanged = 0;
    grid.forEach((s, i) => {
        let occupied = sum(s.neigh.map(n => grid[n].state[curr])),
            changeState = transitionRule(s.state[curr], occupied);
        s.state[next] = s.state[curr] ^ changeState;
        if (changeState) numChanged++;
    });
    return numChanged;
}

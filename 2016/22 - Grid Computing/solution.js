/* --- Day 22: Grid Computing --- */

function silver() {
    return parseInput(x => x.split(/T?\s+/))
        .slice(2)
        .map(([node1, , used], _, nodes) =>
            +used == 0
                ? 0
                : nodes.filter(
                      ([node2, , , avail]) => node2 != node1 && +avail >= +used
                  ).length
        )
        .sum();
}

function gold() {
    let grid = parseInput(x => x.split(/T?\s+/))
            .slice(2)
            .reduce((grid, [node, size, used, avail]) => {
                let [c, r] = node.match(/\d+/g);
                if (r >= grid.length) grid[r] = [];
                grid[r][c] = used == 0 ? ' ' : used < 100 ? '.' : '#';
                return grid;
            }, []),
        emptyRow = grid.findIndex(row => row.includes(' ')),
        emptyCol = grid[emptyRow].indexOf(' ');
    return (
        calcDist({row: 0, col: grid[0].length - 1}, grid)[emptyRow][emptyCol] +
        (grid[0].length - 2) * 5
    );
}

function calcDist(start, grid) {
    const hood = [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1]
    ];

    let dist = grid.map(row => row.map(() => Infinity)),
        queue = [{r: start.row, c: start.col, d: 0}];
    while (queue.length) {
        let {r, c, d} = queue.shift();
        if (
            r >= 0 &&
            r < grid.length &&
            c >= 0 &&
            c < grid[0].length &&
            grid[r][c] != '#' &&
            dist[r][c] > d
        ) {
            dist[r][c] = d;
            hood.forEach(([rInc, cInc]) =>
                queue.push({r: r + rInc, c: c + cInc, d: d + 1})
            );
        }
    }
    return dist;
}

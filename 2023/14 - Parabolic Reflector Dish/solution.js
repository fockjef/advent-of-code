/* --- Day 14: Parabolic Reflector Dish --- */

function silver() {
    let grid = parseInput(x => x.split(''));
    return calculateLoad(tilt(grid, 'U'));
}

function gold() {
    let grid = parseInput(x => x.split('')),
        cache = {};
    for (let i = 1; i <= 1e9; i++) {
        grid = spin(grid);
        let key = grid.map(row => row.join('')).join('');
        if (key in cache) {
            let i0 = cache[key].i0;
            targetI0 = i0 + ((1e9 - i0) % (i - i0));
            return Object.values(cache).find(({i0}) => i0 == targetI0).load;
        }
        cache[key] = {i0: i, load: calculateLoad(grid)};
    }
    return calculateLoad(grid);
}

function calculateLoad(grid) {
    return grid
        .map(
            (row, i) =>
                row.filter(tile => tile == 'O').length * (grid.length - i)
        )
        .sum();
}

function tilt(grid, dir) {
    switch (dir) {
        case 'U':
            grid = grid.transpose();
            break;
        case 'D':
            grid = grid.slice().reverse().transpose();
            break;
        case 'L':
            break;
        case 'R':
            grid = grid.map(row => row.slice().reverse());
            break;
    }
    grid = grid.map(row => {
        row = row.join('');
        while (/\.O/.test(row)) {
            row = row.replace(/(\.+)O/, 'O$1');
        }
        return row.split('');
    });
    switch (dir) {
        case 'U':
            return grid.transpose();
        case 'D':
            return grid.transpose().reverse();
        case 'L':
            return grid;
        case 'R':
            return grid.map(row => row.slice().reverse());
    }
}

function spin(grid) {
    return tilt(tilt(tilt(tilt(grid, 'U'), 'L'), 'D'), 'R');
}

/* --- Day 16: The Floor Will Be Lava --- */

function silver() {
    let grid = parseInput().map(x => x.split(''));
    return numEnergized({x: -1, y: 0, dx: 1, dy: 0}, grid);
}

function gold() {
    let grid = parseInput().map(x => x.split('')),
        maxNumEnergized = -Infinity;
    for (let y = 0, n; y < grid.length; y++) {
        n = numEnergized({x: -1, y: y, dx: 1, dy: 0}, grid);
        if (n > maxNumEnergized) maxNumEnergized = n;
        n = numEnergized({x: grid[0].length, y: y, dx: -1, dy: 0}, grid);
        if (n > maxNumEnergized) maxNumEnergized = n;
    }
    for (let x = 0, n; x < grid[0].length; x++) {
        n = numEnergized({x: x, y: -1, dx: 0, dy: 1}, grid);
        if (n > maxNumEnergized) maxNumEnergized = n;
        n = numEnergized({x: x, y: grid.length, dx: 0, dy: -1}, grid);
        if (n > maxNumEnergized) maxNumEnergized = n;
    }
    return maxNumEnergized;
}

function numEnergized(beam, grid) {
    let energized = grid.map(row => new Array(row.length).fill(0)),
        seen = new Set(),
        beams = [beam];
    while (beams.length) {
        let {x, y, dx, dy} = beams.shift(),
            key = [x, y, dx, dy].join(':');
        x += dx;
        y += dy;
        if (
            !seen.has(key) &&
            x >= 0 &&
            x < grid[0].length &&
            y >= 0 &&
            y < grid.length
        ) {
            energized[y][x]++;
            seen.add(key);
            switch (grid[y][x]) {
                case '.':
                    beams.push({x, y, dx, dy});
                    break;
                case '|':
                    if (dx) {
                        beams.push({x, y, dx: 0, dy: 1});
                        beams.push({x, y, dx: 0, dy: -1});
                    } else {
                        beams.push({x, y, dx, dy});
                    }
                    break;
                case '-':
                    if (dy) {
                        beams.push({x, y, dx: 1, dy: 0});
                        beams.push({x, y, dx: -1, dy: 0});
                    } else {
                        beams.push({x, y, dx, dy});
                    }
                    break;
                case '\\':
                    if (dx) {
                        beams.push({x, y, dx: 0, dy: dx});
                    } else {
                        beams.push({x, y, dx: dy, dy: 0});
                    }
                    break;
                case '/':
                    if (dx) {
                        beams.push({x, y, dx: 0, dy: -dx});
                    } else {
                        beams.push({x, y, dx: -dy, dy: 0});
                    }
                    break;
            }
        }
    }
    return energized.flat().filter(Boolean).length;
}

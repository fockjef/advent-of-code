/* --- Day 17: Two Steps Forward --- */

function silver() {
    let passwd = parseInput()[0];
    return findPath(passwd).next().value;
}

function gold() {
    let passwd = parseInput()[0],
        path;
    for (p of findPath(passwd)) {
        path = p;
    }
    return path.length;
}

function* findPath(passwd) {
    const maxRow = 3,
        maxCol = 3,
        openDoor = 'bcdef';

    let queue = [{row: 0, col: 0, path: ''}];

    while (queue.length) {
        let {row, col, path} = queue.shift();
        if (row == maxRow && col == maxCol) {
            yield path;
        } else {
            let hash = md5(passwd + path);
            if (row > 0 && openDoor.includes(hash[0]))
                queue.push({row: row - 1, col: col, path: path + 'U'});
            if (row < maxRow && openDoor.includes(hash[1]))
                queue.push({row: row + 1, col: col, path: path + 'D'});
            if (col > 0 && openDoor.includes(hash[2]))
                queue.push({row: row, col: col - 1, path: path + 'L'});
            if (col < maxCol && openDoor.includes(hash[3]))
                queue.push({row: row, col: col + 1, path: path + 'R'});
        }
    }
}

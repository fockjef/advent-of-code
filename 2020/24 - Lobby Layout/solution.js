/* --- Day 24: Lobby Layout --- */

const neigh = [
    [-1, -1],
    [1, -1],
    [-2, 0],
    [2, 0],
    [-1, 1],
    [1, 1]
];

function silver(numDays = 0) {
    let black = new Set();
    parseInput(x => x.match(/ne|se|nw|sw|e|w/g)).forEach(path => {
        let x = 0,
            y = 0;
        path.forEach(s => {
            x += (3 - s.length) * (s[s.length - 1] === 'e' ? 1 : -1);
            y += (s.length - 1) * (s[0] === 'n' ? 1 : -1);
        });
        let id = pos2Id(x, y);
        black.has(id) ? black.delete(id) : black.add(id);
    });
    for (let i = 0; i < numDays; i++) {
        black = evolve(black);
    }
    return black.size;
}

function gold() {
    return silver(100);
}

function evolve(black) {
    let orange = new Set(), // orange *is* the new black
        world = new Set();
    black.forEach(id => {
        let [x, y] = id2Pos(id);
        world.add(id);
        neigh.forEach(n => world.add(pos2Id(x + n[0], y + n[1])));
    });
    world.forEach(id => {
        let [x, y] = id2Pos(id),
            numNeigh = neigh.filter(n =>
                black.has(pos2Id(x + n[0], y + n[1]))
            ).length;
        if (numNeigh === 2 || (black.has(id) && numNeigh === 1)) orange.add(id);
    });
    return orange;
}

function pos2Id(x, y) {
    return (x & 0xffff) + (y << 16);
}

function id2Pos(id) {
    return [
        id & 0x8000 ? (id & 0xffff) - 0x10000 : id & 0xffff,
        id & 0x80000000 ? (id >>> 16) - 0x10000 : id >>> 16
    ];
}

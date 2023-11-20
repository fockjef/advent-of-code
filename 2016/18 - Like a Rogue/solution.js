/* --- Day 18: Like a Rogue --- */

function silver(numRows = 40) {
    let tiles = parseInput()[0]
            .split('')
            .map(tile => (tile == '.' ? 0 : 1)),
        numSafe = tiles.filter(x => !x).length;
    for (let i = 1; i < numRows; i++) {
        tiles = [
            tiles[1],
            ...tiles.slice(1, -1).map((_, j) => tiles[j] ^ tiles[j + 2]),
            tiles[tiles.length - 2]
        ];
        numSafe += tiles.filter(x => !x).length;
    }
    return numSafe;
}

function gold() {
    return silver(400000);
}

/* --- Day 3: Toboggan Trajectory --- */

function silver([incC, incR] = [3, 1]) {
    let data = parseInput(x => x.split('')),
        numTrees = 0;
    for (
        let r = 0, c = 0;
        r < data.length;
        r += incR, c = (c + incC) % data[0].length
    ) {
        if (data[r][c] === '#') numTrees++;
    }
    return numTrees;
}

function gold() {
    return prod(
        [
            [1, 1],
            [3, 1],
            [5, 1],
            [7, 1],
            [1, 2]
        ].map(silver)
    );
}

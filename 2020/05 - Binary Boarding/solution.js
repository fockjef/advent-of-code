/* --- Day 5: Binary Boarding --- */

function silver() {
    let data = parseInput();
    return Math.max(
        ...data.map(x =>
            parseInt(x.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2)
        )
    );
}

function gold() {
    let data = parseInput();
    return (
        data
            .map(x => parseInt(x.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2))
            .sort((a, b) => a - b)
            .filter((x, i, X) => i + 1 < X.length && X[i + 1] === x + 2)[0] + 1
    );
}

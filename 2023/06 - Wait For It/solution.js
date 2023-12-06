/* --- Day 6: Wait For It --- */

function silver() {
    let [T, D] = parseInput(x => x.match(/\d+/g).map(Number));
    return T.map(
        (t, i) =>
            Math.floor((t + Math.sqrt(t * t - 4 * (D[i] + 1))) / 2) -
            Math.ceil((t - Math.sqrt(t * t - 4 * (D[i] + 1))) / 2) +
            1
    ).prod();
}

function gold() {
    let [T, D] = parseInput(x =>
        x.replace(/\s+/g, '').match(/\d+/g).map(Number)
    );
    return T.map(
        (t, i) =>
            Math.floor((t + Math.sqrt(t * t - 4 * (D[i] + 1))) / 2) -
            Math.ceil((t - Math.sqrt(t * t - 4 * (D[i] + 1))) / 2) +
            1
    ).prod();
}

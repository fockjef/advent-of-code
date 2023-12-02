/* --- Day 2: Cube Conundrum --- */

function silver() {
    return parseInput()
        .filter(
            x =>
                x.match(/\d+(?= red)/g).max() <= 12 &&
                x.match(/\d+(?= green)/g).max() <= 13 &&
                x.match(/\d+(?= blue)/g).max() <= 14
        )
        .map(x => x.match(/\d+/)[0])
        .sum();
}

function gold() {
    return parseInput()
        .map(
            x =>
                x.match(/\d+(?= red)/g).max() *
                x.match(/\d+(?= green)/g).max() *
                x.match(/\d+(?= blue)/g).max()
        )
        .sum();
}

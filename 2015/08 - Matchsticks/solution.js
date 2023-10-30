/* --- Day 8: Matchsticks --- */

function silver() {
    return parseInput(null)[0]
        .match(/^"|"$|\\\\|\\"|\\x[\da-z]{2}/gim)
        .map(m => m.length - 1 || 1)
        .sum();
}

function gold() {
    return parseInput()
        .map(str => 2 + str.match(/\\|"/g).length)
        .sum();
}

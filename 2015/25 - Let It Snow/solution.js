/* --- Day 25: Let It Snow --- */

function silver() {
    let [row, col] = parseInput()[0].match(/\d+/g).map(Number),
        code = 20151125,
        b = 252533,
        e = ((row + col) * (row + col - 1)) / 2 - row,
        m = 33554393;
    return (code * modpow(b, e, m)) % m;
}

function modpow(b, e, m) {
    let c = 1;
    while (e) {
        if (e % 2) {
            c = (c * b) % m;
        }
        b = (b * b) % m;
        e >>>= 1;
    }
    return c;
}

/* --- Day 4: The Ideal Stocking Stuffer --- */

function silver(prefix = '00000') {
    let secret = parseInput()[0];
    for (let i = 1; true; i++) {
        if (md5(secret + i).slice(0, prefix.length) === prefix) return i;
    }
}

function gold() {
    return silver('000000');
}

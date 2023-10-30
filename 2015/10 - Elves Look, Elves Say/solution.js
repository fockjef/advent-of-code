/* --- Day 10: Elves Look, Elves Say --- */

function silver(n = 40) {
    let seq = parseInput()[0];
    for (let i = 0; i < n; i++) {
        seq = lookAndSay(seq);
    }
    return seq.length;
}

function gold() {
    return silver(50);
}

const lookAndSay = seq => seq.replace(/(\d)\1*/g, m => m.length + m[0]);

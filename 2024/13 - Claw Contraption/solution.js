/* --- Day 13: Claw Contraption --- */

function silver(offset=0){
    return parseInput("\n\n")
    .map(x => {
        x = x.match(/\d+/g).map(Number);
        return {A: {x: x[0], y: x[1]}, B: {x: x[2], y: x[3]}, P: {x: x[4] + offset, y: x[5] + offset}}
    })
    .map(({A, B, P}) => [
        (B.y * P.x - B.x * P.y) / (B.y * A.x - B.x * A.y),
        (A.y * P.x - A.x * P.y) / (A.y * B.x - A.x * B.y)
    ])
    .filter(x => x.every(n => n >= 0 && Number.isInteger(n)))
    .map(([nA, nB]) => 3 * nA + nB)
    .sum()
}

function gold(){
    return silver(10000000000000);
}

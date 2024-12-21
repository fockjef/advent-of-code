/* --- Day 14: Restroom Redoubt --- */

const maxX = 101;
const maxY = 103;

function silver(){
    let midX = maxX >>> 1,
        midY = maxY >>> 1,
        robots = moveRobots(100),
        Q1 = robots.filter(([x, y]) => x < midX && y < midY).length,
        Q2 = robots.filter(([x, y]) => x > midX && y < midY).length,
        Q3 = robots.filter(([x, y]) => x < midX && y > midY).length,
        Q4 = robots.filter(([x, y]) => x > midX && y > midY).length;
    return Q1 * Q2 * Q3 * Q4;
}

function gold(){
    let midX = maxX >>> 1,
        midY = maxY >>> 1,
        data = new Array(Math.max(maxX, maxY));
    for(let n = 0; n < data.length; n++){
        let robots = moveRobots(n);
        data[n] = [
            robots.map(([x, y]) => Math.abs(x - midX)).mean(), // avg X distance from center
            robots.map(([x, y]) => Math.abs(y - midY)).mean()  // avg Y distance from center
        ];
    }
    let minVarX = Math.min(...data.slice(0, maxX).map(([x, y]) => x)),
        minVarY = Math.min(...data.slice(0, maxY).map(([x, y]) => y));
    return crt([
        {a: data.findIndex(([x, y]) => x == minVarX), n: maxX},
        {a: data.findIndex(([x, y]) => y == minVarY), n: maxY}
    ]).a;
}

function moveRobots(numSteps){
    return parseInput(x => x.match(/-?\d+/g).map(Number))
        .map(([x0, y0, xInc, yInc]) => [
            (((x0 + numSteps * xInc) % maxX) + maxX) % maxX,
            (((y0 + numSteps * yInc) % maxY) + maxY) % maxY
        ]);
}

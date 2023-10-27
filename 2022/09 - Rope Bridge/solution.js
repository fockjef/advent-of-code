/* --- Day 9: Rope Bridge --- */

var silver = () => simulateRope(2);
var gold = () => simulateRope(10);

function simulateRope(numKnots) {
    let knots = Array.from(new Array(numKnots), () => ({x: 0, y: 0})),
        visited = new Set(['0,0']);
    parseInput(move => move.split(' ')).forEach(([dir, dist]) => {
        let incX = dir == 'R' ? 1 : dir == 'L' ? -1 : 0,
            incY = dir == 'U' ? 1 : dir == 'D' ? -1 : 0;
        for (let i = 0; i < +dist; i++) {
            knots[0].x += incX;
            knots[0].y += incY;
            for (let j = 1; j < numKnots; j++) {
                let dX = knots[j - 1].x - knots[j].x,
                    dY = knots[j - 1].y - knots[j].y;
                if (Math.abs(dX) < 2 && Math.abs(dY) < 2) break;
                knots[j].x += Math.sign(dX);
                knots[j].y += Math.sign(dY);
            }
            visited.add(knots[numKnots - 1].x + ',' + knots[numKnots - 1].y);
        }
    });
    return visited.size;
}

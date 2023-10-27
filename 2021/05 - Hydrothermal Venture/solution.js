/* --- Day 5: Hydrothermal Venture --- */

function silver() {
    let data = parseInput(x => x.match(/\d+/g).map(Number)),
        vents = data.filter(([x0, y0, x1, y1]) => x0 == x1 || y0 == y1);
    return countOverlaps(vents);
}

function gold() {
    let data = parseInput(x => x.match(/\d+/g).map(Number)),
        vents = data;
    return countOverlaps(vents);
}

function countOverlaps(vents) {
    let xMin = Math.min(...vents.map(([x0, y0, x1, y1]) => Math.min(x0, x1))),
        yMin = Math.min(...vents.map(([x0, y0, x1, y1]) => Math.min(y0, y1))),
        xMax = Math.max(...vents.map(([x0, y0, x1, y1]) => Math.max(x0, x1))),
        yMax = Math.max(...vents.map(([x0, y0, x1, y1]) => Math.max(y0, y1))),
        seafloor = Array.from(new Array(yMax - yMin + 1), () =>
            new Array(xMax - xMin + 1).fill(0)
        );
    vents.forEach(([x0, y0, x1, y1]) => {
        let xInc = Math.sign(x1 - x0),
            yInc = Math.sign(y1 - y0);
        while ((x1 - x0) * xInc >= 0 && (y1 - y0) * yInc >= 0) {
            seafloor[y0 - yMin][x0 - xMin]++;
            x0 += xInc;
            y0 += yInc;
        }
    });
    return sum(seafloor.map(row => row.filter(n => n > 1).length));
}

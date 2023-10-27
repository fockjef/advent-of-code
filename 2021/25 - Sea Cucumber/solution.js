/* --- Day 25: Sea Cucumber --- */

function silver() {
    let data = parseInput(x => x.split('')),
        numSteps = 0;
    while (step(data)) {
        numSteps++;
    }
    return numSteps + 1;
}

function step(herd) {
    let herdMoved = false;
    [
        {cuke: '>', rOff: 0, cOff: 1},
        {cuke: 'v', rOff: 1, cOff: 0}
    ].forEach(({cuke, rOff, cOff}) => {
        let temp = herd.map(row => row.slice());
        for (let row = 0; row < herd.length; row++) {
            for (let col = 0; col < herd[0].length; col++) {
                let nextR = (row + rOff) % herd.length,
                    nextC = (col + cOff) % herd[0].length;
                if (temp[row][col] == cuke && temp[nextR][nextC] == '.') {
                    herd[row][col] = '.';
                    herd[nextR][nextC] = cuke;
                    if (!herdMoved) herdMoved = true;
                }
            }
        }
    });
    return herdMoved;
}

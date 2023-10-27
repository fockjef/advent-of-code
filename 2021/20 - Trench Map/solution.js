/* --- Day 20: Trench Map --- */

function silver(numSteps = 2) {
    let data = parseInput(/\n\n/),
        algo = data[0].split(''),
        image = data[1].split(/\n/).map(x => x.split(''));
    if (algo[0] == '#' && (algo[511] == '#' || numSteps % 2 == 1)) {
        return Infinity;
    }
    for (let step = 0; step < numSteps; step++) {
        image = enhance(image, algo, step);
    }
    return sum(image.map(row => row.filter(x => x == '#').length));
}

function gold() {
    return silver(50);
}

const neighborhood = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

function enhance(image, algo, step) {
    let enhanced = Array.from(
        new Array(image.length + 2),
        () => new Array(image[0].length + 2)
    );
    for (let row = -1; row <= image.length; row++) {
        for (let col = -1; col <= image[0].length; col++) {
            let idx = '';
            neighborhood.forEach(([r, c]) => {
                r += row;
                c += col;
                if (
                    r >= 0 &&
                    c >= 0 &&
                    r < image.length &&
                    c < image[0].length
                ) {
                    idx += image[r][c];
                } else {
                    idx += algo[0] == '.' || step % 2 == 0 ? '.' : '#';
                }
            });
            idx = parseInt(idx.replace(/\./g, '0').replace(/#/g, '1'), 2);
            enhanced[row + 1][col + 1] = algo[idx];
        }
    }
    return enhanced;
}

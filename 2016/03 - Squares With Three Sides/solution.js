/* --- Day 3: Squares With Three Sides --- */

function silver() {
    return parseInput(x => x.match(/\d+/g).map(Number)).filter(isValidTriangle)
        .length;
}

function gold() {
    return parseInput(x => x.match(/\d+/g).map(Number))
        .map((_, i, d) => {
            switch (i % 3) {
                case 0:
                    return [i, i + 1, i + 2].map(j => d[j][0]);
                case 1:
                    return [i - 1, i, i + 1].map(j => d[j][1]);
                case 2:
                    return [i - 2, i - 1, i].map(j => d[j][2]);
            }
        })
        .filter(isValidTriangle).length;
}

function isValidTriangle([a, b, c]) {
    return a + b > c && a + c > b && b + c > a;
}

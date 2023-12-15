/* --- Day 13: Point of Incidence --- */

function silver(numS = 0) {
    return parseInput('\n\n')
        .map(pattern => {
            let rows = pattern.split('\n').map(row => row.split(''));
            for (let r = 1; r < rows.length; r++) {
                if (numSmudges(rows.slice(0, r), rows.slice(r)) == numS) {
                    return 100 * r;
                }
            }
            let cols = rows.transpose();
            for (let c = 1; c < cols.length; c++) {
                if (numSmudges(cols.slice(0, c), cols.slice(c)) == numS) {
                    return c;
                }
            }
        })
        .sum();
}

function gold() {
    return silver(1);
}

function numSmudges(a, b) {
    let numSmudges = 0;
    for (let i = a.length - 1, j = 0; i >= 0 && j < b.length; i--, j++) {
        for (let k = 0; k < a[i].length; k++) {
            if (a[i][k] != b[j][k]) numSmudges++;
        }
    }
    return numSmudges;
}

Array.prototype.transpose = function () {
    let T = Array.from(new Array(this[0].length), () => new Array(this.length));
    for (let r = 0; r < this.length; r++) {
        for (let c = 0; c < T.length; c++) {
            T[c][r] = this[r][c];
        }
    }
    return T;
};

/* --- Day 14: Extended Polymerization --- */

function silver(numSteps = 10) {
    let data = parseInput(/\n\n/),
        rules = Object.fromEntries(
            data[1]
                .split(/\n/)
                .map(r => [r.slice(0, 2), [r[0] + r[6], r[6] + r[1]]])
        ),
        polymer = {};

    // initialize polymer pair counts
    for (let i = 0; i < data[0].length - 1; i++) {
        let pair = data[0].slice(i, i + 2);
        polymer[pair] = (polymer[pair] || 0) + 1;
    }

    // apply polymer pair insertion {{numSteps}} times
    for (let i = 0; i < numSteps; i++) {
        polymer = Object.keys(polymer).reduce((newPoly, pair) => {
            rules[pair].forEach(
                p => (newPoly[p] = (newPoly[p] || 0) + polymer[pair])
            );
            return newPoly;
        }, {});
    }

    // count number of each element in the polymer (actually double count)
    let counts = Object.keys(polymer).reduce((C, pair) => {
        pair.split('').forEach(p => (C[p] = (C[p] || 0) + polymer[pair]));
        return C;
    }, {});
    // adjust for endpoints not being double counted
    counts[data[0][0]]++;
    counts[data[0][data[0].length - 1]]++;
    counts = Object.values(counts).sort(numericSortAsc);

    return (counts[counts.length - 1] - counts[0]) / 2;
}

function gold() {
    return silver(40);
}

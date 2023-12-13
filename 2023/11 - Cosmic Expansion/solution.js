/* --- Day 11: Cosmic Expansion --- */

function silver(expansionFactor = 2) {
    let grid = parseInput(x => x.split('')),
        rowHeights = grid.map(row => (row.includes('#') ? 1 : expansionFactor)),
        colWidths = Array.from(new Array(grid[0].length), (_, i) =>
            grid.some(row => row[i] == '#') ? 1 : expansionFactor
        ),
        galaxies = [],
        dist = 0;

    // find galaxies
    grid.forEach((row, r) =>
        row.forEach((cell, c) => {
            if (cell == '#') galaxies.push({r, c});
        })
    );

    // find distance between each pair of galaxies
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            let rows = [galaxies[i].r, galaxies[j].r].numericSortAsc(),
                cols = [galaxies[i].c, galaxies[j].c].numericSortAsc();
            dist +=
                rowHeights.slice(...rows).sum() +
                colWidths.slice(...cols).sum();
        }
    }

    return dist;
}

function gold() {
    return silver(1000000);
}

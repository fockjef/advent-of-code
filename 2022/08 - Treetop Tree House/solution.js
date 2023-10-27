/* --- Day 8: Treetop Tree House --- */

function silver() {
    let grid = parseInput(row => row.trim().split('')),
        numVisible = (grid.length + grid[0].length - 2) * 2;
    for (let r = 1; r < grid.length - 1; r++) {
        for (let c = 1; c < grid[r].length - 1; c++) {
            if (
                isVisible(grid[r][c], grid[r].slice(0, c)) || // left
                isVisible(grid[r][c], grid[r].slice(c + 1)) || // right
                isVisible(
                    grid[r][c],
                    grid.slice(0, r).map(g => g[c])
                ) || // up
                isVisible(
                    grid[r][c],
                    grid.slice(r + 1).map(g => g[c])
                ) // down
            ) {
                numVisible++;
            }
        }
    }
    return numVisible;
}

function gold() {
    let grid = parseInput(row => row.trim().split('')),
        bestScore = -Infinity;
    for (let r = 1; r < grid.length - 1; r++) {
        for (let c = 1; c < grid[r].length - 1; c++) {
            let score =
                treesSeen(grid[r][c], grid[r].slice(0, c).reverse()) * // left
                treesSeen(grid[r][c], grid[r].slice(c + 1)) * // right
                treesSeen(
                    grid[r][c],
                    grid
                        .slice(0, r)
                        .map(g => g[c])
                        .reverse()
                ) * // up
                treesSeen(
                    grid[r][c],
                    grid.slice(r + 1).map(g => g[c])
                ); // down
            if (score > bestScore) bestScore = score;
        }
    }
    return bestScore;
}

const isVisible = (tree, forest) => forest.every(t => t < tree);
const treesSeen = (tree, forest) =>
    forest.findIndex(t => t >= tree) + 1 || forest.length;

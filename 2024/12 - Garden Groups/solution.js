/* --- Day 12: Garden Groups --- */

const neighbors = [[-1, 0], [0, -1], [0, 1], [1, 0]];

function silver(){
    return howDoesYourGardenGrow().map(p => p.area * p.perimeter).sum();
}

function gold(){
    return howDoesYourGardenGrow().map(p => p.area * p.sides).sum();
}

function howDoesYourGardenGrow(){
    let grid= parseInput(x => x.split("")),
        seen = grid.map(row => row.map(() => 0)),
        plots = [];

    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[0].length; col++){
            if(!seen[row][col]){
                let area = 0,
                    perimeter = 0,
                    plant = grid[row][col],
                    plot = [{r: row, c: col}];
                for(let i = 0; i < plot.length; i++){
                    let {r, c} = plot[i];
                    if(!seen[r][c]){
                        seen[r][c] = 1;
                        let n = neighbors
                            .map(([rInc, cInc]) => ({r: r + rInc, c: c + cInc}))
                            .filter(({r, c}) => 0 <= r && r < grid.length &&
                                                0 <= c && c < grid[0].length &&
                                                grid[r][c] == plant
                            );
                        area++;
                        perimeter += 4 - n.length;
                        plot.push(...n);
                    }
                }
                plots.push({plant, area, perimeter, sides: countSides(plot.uniq())});
            }
        }
    }

    return plots;
}

function countSides(plot){
    function _countSides(plot){
        let maxR = Math.max(...plot.map(p => p.r)),
            maxC = Math.max(...plot.map(p => p.c)),
            grid = Array.from(new Array(maxR+1), () => new Array(maxC+1).fill(0)),
            numSides = 0

        plot.sort((a, b) => a.r - b.r || a.c - b.c).forEach(p => {
            if((p.c == 0 || grid[p.r][p.c-1] == 0) && (p.r == 0 || grid[p.r-1][p.c] == 0 || (p.c > 0 && grid[p.r-1][p.c-1] == 1))){
                numSides++;
            }
            grid[p.r][p.c] = 1;
        });

        return numSides;
    }

    let minR = Math.min(...plot.map(p => p.r)),
        maxR = Math.max(...plot.map(p => p.r - minR)),
        minC = Math.min(...plot.map(p => p.c)),
        maxC = Math.max(...plot.map(p => p.c - minC)),
        numSides = 0;

    plot = plot.uniq().map(p => ({r: p.r - minR, c: p.c - minC}));
    numSides += _countSides(plot);
    numSides += _countSides(plot.map(p => ({r: p.r, c: maxC-p.c})));
    numSides += _countSides(plot.map(p => ({r: p.c, c: p.r})));
    numSides += _countSides(plot.map(p => ({r: p.c, c: maxR-p.r})));
    return numSides;
}

/* --- Day 24: Air Duct Spelunking --- */

function silver(returnToStart = false){
    let grid = parseInput(x => x.split(""));
        targets = grid.flat().filter(x => /\d/.test(x)).reduce((targets, t) => {
            targets[t] = {};
            targets[t].row = grid.findIndex(row => row.includes(t));
            targets[t].col = grid[targets[t].row].indexOf(t);
            return targets;
        }, {}),
        minDist = Infinity;
    Object.keys(targets).forEach(t => targets[t].dist = calcDist(targets[t], grid));
    for(let path of permute(Object.keys(targets).filter(t => t!= "0"))){
        path = ["0"].concat(path);
        if( returnToStart ) path.push("0");
        let dist = 0;
        for(let i = 1; i < path.length; i++){
            let {row, col} = targets[path[i]];
            dist += targets[path[i-1]].dist[row][col];
            if( dist > minDist ) break;
        }
        if( dist < minDist ) minDist = dist;
    }
    return minDist;
}

function gold(){
    return silver(true);
}

function calcDist(start, grid){
    const hood = [
        [ 0, -1],
        [-1,  0],
        [ 1,  0],
        [ 0,  1]
    ];

    let dist = grid.map(row => row.map(() => Infinity)),
        queue = [{r: start.row, c: start.col, d: 0}];
    while( queue.length ){
        let {r, c, d} = queue.shift();
        if( r >= 0 &&
            r < grid.length &&
            c >= 0 &&
            c < grid[0].length &&
            grid[r][c] != "#" &&
            dist[r][c] > d
        ){
            dist[r][c] = d;
            hood.forEach(([rInc, cInc]) => queue.push({r: r + rInc, c: c + cInc, d: d + 1}));
        }
    }
    return dist;
}
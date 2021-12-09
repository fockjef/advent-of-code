/* --- Day 9: Smoke Basin --- */

const neighborhood = [
    [ -1,  0], // U
    [  1,  0], // D
    [  0, -1], // L
    [  0,  1]  // R
];

function getNeighbors( row, col, grid){
    return neighborhood
        .map( ([ r, c]) => [ r + row, c + col])
        .filter( ([ r, c]) => r >= 0 && c >= 0 && r < grid.length && c < grid[0].length)
        .map( ([ r, c]) => ({
            val: grid[r][c],
            row: r,
            col: c
        }));
}

function getBasinSize( row, col, heightmap){
    let queue = [[ row, col]],
        size = 1;
    heightmap[row][col] = 9;
    while( queue.length ){
        let [ row, col] = queue.shift();
        getNeighbors( row, col, heightmap).forEach( n => {
            if( n.val != 9 ){
                queue.push([ n.row, n.col]);
                size++;
                heightmap[n.row][n.col] = 9;
            }
        });
    }
    return size;
}

function day_09a(){
    let heightmap = parseInput( x => x.trim().split("").map(Number)),
        lowPoints = 0;
    for( let row = 0; row < heightmap.length; row++ ){
        for( let col = 0; col < heightmap[0].length; col++ ){
            let val = heightmap[row][col];
            if( getNeighbors( row, col, heightmap).every( n => n.val > val) ){
                lowPoints += val + 1;
            }
        }
    }
    return lowPoints;
}

function day_09b(){
    let heightmap = parseInput( x => x.trim().split("").map(Number)),
        basins = [];
    for( let row = 0; row < heightmap.length; row++ ){
        for( let col = 0; col < heightmap.length; col++ ){
            if( heightmap[row][col] != 9 ){
                basins.push(getBasinSize( row, col, heightmap));
            }
        }
    }
    return prod(basins.sort(numericSortDesc).slice(0,3));
}

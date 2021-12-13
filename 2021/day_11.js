/* --- Day 11: Dumbo Octopus --- */

const neighborhood = [
    [ -1, -1], [ -1,  0], [ -1,  1],
    [  0, -1],            [  0,  1],
    [  1, -1], [  1,  0], [  1,  1]
];

function evolve(grid){
    let flashQueue = [];
    for( let r = 0; r < grid.length; r++ ){
        for( c = 0; c < grid[r].length; c++ ){
            grid[r][c]++;
            if( grid[r][c] == 10 ) flashQueue.push([ r, c]);
        }
    }
    for( let i = 0; i < flashQueue.length; i++ ){
        let [ r, c] = flashQueue[i];
        for( let n = 0; n < neighborhood.length; n++ ){
            let [ rr, cc] = neighborhood[n];
            rr += r;
            cc += c;
            if( rr >= 0 && cc >= 0 && rr < grid.length && cc < grid[r].length ){
                grid[rr][cc]++;
                if( grid[rr][cc] == 10 ) flashQueue.push([ rr, cc]);
            }
        }
    }
    for( let i = 0; i < flashQueue.length; i++ ){
        let [ r, c] = flashQueue[i];
        grid[r][c] = 0;
    }
    return flashQueue;
}

function day_11a(){
    let data = parseInput( x => x.split("").map(Number)),
        numFlashes = 0;
    for( let i = 0; i < 100; i++ ){
        numFlashes += evolve(data).length;
    }
    return numFlashes;
}

function day_11b(){
    let data = parseInput( x => x.split("").map(Number)),
        steps = 0;
    while( 1 ){
        steps++;
        let numFlashes = evolve(data).length;
        if( numFlashes == data.length * data[0].length ) return steps;
    }
}
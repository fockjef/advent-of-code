/* --- Day 10: Hoof It --- */

function silver(){
    let map = parseInput(x => x.split("").map(Number)),
        trailheads = [];

    map.forEach((row, y) => row.forEach((height, x) => {
        if(height == 0) trailheads.push({height, x, y});
    }));

    return trailheads.map(t => goodTrails(t, map)).sum();
}

function gold(){
    let map = parseInput(x => x.split("").map(Number)),
        trailheads = [];

    map.forEach((row, y) => row.forEach((height, x) => {
        if(height == 0) trailheads.push({height, x, y});
    }));

    return trailheads.map(t => goodTrails(t, map, false)).sum();
}

function goodTrails(trail, map, uniq=true){
    let trails = [trail],
        peaks = [];
    while(trails.length){
        let {height, x , y} = trails.pop();
        if(height == 9){
            peaks.push(`${x},${y}`);
        }
        else{
            if(x > 0 && map[y][x-1] == height + 1) trails.push({height: height + 1, x: x - 1, y});
            if(x < map[0].length - 1 && map[y][x+1] == height + 1) trails.push({height: height + 1, x: x + 1, y});
            if(y > 0 && map[y-1][x] == height + 1) trails.push({height: height + 1, x, y: y - 1});
            if(y < map.length - 1 && map[y+1][x] == height + 1) trails.push({height: height + 1, x, y: y + 1});
        }
    }
    if(uniq) peaks = peaks.uniq();
    return peaks.length;
}
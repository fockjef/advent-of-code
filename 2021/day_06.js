/* --- Day 6: Lanternfish --- */

function numFish( t0, numDays){
    fish = new Array(9).fill(0);
    fish[t0] = 1;
    for( let d = 0; d < numDays; d++ ){
        fish[(d + 7) % fish.length] += fish[d % fish.length];
    }
    return sum(fish);
}

function day_06a( numDays = 80){
    let data = parseInput( Number, /,/),
        fish = Array.from( new Array(7), ( _, i) => numFish( i, numDays));
    return sum( data.map( x => fish[x]));
}

function day_06b(){
    return day_06a(256);
}
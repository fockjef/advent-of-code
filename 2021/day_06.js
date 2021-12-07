/* --- Day 6: Lanternfish --- */

function numFish( fish, numDays){
    for( let d = 0; d < numDays; d++ ){
        fish[(d + 7) % fish.length] += fish[d % fish.length];
    }
    return sum(fish);
}

function day_06a( numDays = 80){
    let data = parseInput( Number, /,/),
        fish = new Array(9).fill(0);
    data.forEach( x => fish[x]++);
    return numFish( fish, numDays);
}

function day_06b(){
    return day_06a(256);
}
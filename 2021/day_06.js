/* --- Day 6: Lanternfish --- */

const numFish = (function(){
    let cache = {};
    return function( numDays, t0){
        // check cache for redundant calls
        let key = `${+t0}:${+numDays}`;
        if( key in cache ) return cache[key];
        fish = new Array(9).fill(0);
        fish[t0] = 1;
        for( let d = 1; d <= numDays; d++ ){
            let newFish = fish[0];
            for( let i = 1; i < fish.length; i++ ){
                fish[i-1] = fish[i];
            }
            fish[6] += newFish;
            fish[8] = newFish;
        }
        // save result into cache before returning
        return cache[key] = sum(fish);
    }
})();

function day_06a( numDays = 80){
    let data = parseInput( Number, /,/);
    return sum( data.map(numFish.bind( null, numDays)));
}

function day_06b(){
    return day_06a(256);
}
/* --- Day 14: Reindeer Olympics --- */

function silver(){
    return parseInput(x => distance(2503, ...x.match(/\d+/g).map(Number))).max();
}

function gold(){
    let reindeer = parseInput(x => {
            let [name, rate, tFly, tRest] = x.match(/^\S+|\d+/g);
            return [name, +rate, +tFly, +tRest];
        }),
        score = Object.fromEntries(reindeer.map(r => [r[0], 0]));
    for( let i = 1; i <= 2503; i++ ){
        reindeer
            .map(r => [r[0], distance(i, ...r.slice(1))])
            .sort((a, b) => b[1] - a[1])
            .filter((r, i, R) => r[1] == R[0][1])
            .forEach(r => score[r[0]]++);
    }
    return Object.values(score).max();
}

function distance(time, rate, tFly, tRest){
    let tTotal = tFly + tRest;
    return (Math.floor(time / tTotal) * tFly + Math.min(time % tTotal, tFly)) * rate;
}

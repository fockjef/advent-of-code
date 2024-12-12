/* --- Day 11: Plutonian Pebbles --- */

(function(){
    let cache = {};
    globalThis.count = function(n, x){
        if(x == 0) return 1;

        let key = `${n}:${x}`;
        if(!(key in cache)){
            let s = n.toString();
            cache[key] = n == 0
                         ? count(1, x - 1)
                         : s.length % 2
                         ? count(2024 * n, x - 1)
                         : count(+s.slice(0, s.length / 2), x - 1) + count(+s.slice(s.length / 2), x - 1);
        }
        return cache[key];
    };
})();

function silver(numBlinks = 25){
    return parseInput(Number, " ").map(n => count(n, numBlinks)).sum()
}

function gold(){
    return silver(75);
}
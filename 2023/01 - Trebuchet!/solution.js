/* --- Day 1: Trebuchet?! --- */

function silver() {
    return parseInput(x => x.match(/\d/g))
        .map(d => d[0] + d[d.length - 1])
        .sum();
}

function gold() {
    let nums = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9
        },
        numsRE = new RegExp(Object.keys(nums).join('|'));
    return parseInput(x => {
        while (numsRE.test(x)) {
            x = x.replace(numsRE, n => nums[n] + n.slice(1));
        }
        x = x.match(/\d/g);
        return x[0] + x[x.length - 1];
    }).sum();
}

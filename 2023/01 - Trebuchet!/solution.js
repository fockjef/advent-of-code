/* --- Day 1: Trebuchet?! --- */

function silver() {
    return parseInput(x => x.match(/\d/g))
        .map(d => d[0] + d[d.length - 1])
        .sum();
}

function gold() {
    let nums = "one|two|three|four|five|six|seven|eight|nine",
        numRE = new RegExp(nums),
        lastNumRE = new RegExp(`^(.*)(${nums})`);
    nums = Object.fromEntries(nums.split("|").map((n, i) => [n, i + 1]));
    return parseInput(x => x
            .replace(numRE, n => nums[n] + n.slice(1))
            .replace(lastNumRE, (_, pre, n) => pre + nums[n])
            .match(/\d/g)
        )
        .map(d => d[0] + d[d.length - 1])
        .sum();
}

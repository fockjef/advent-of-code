/* --- Day 1: Trebuchet?! --- */

function silver() {
    return parseInput(x => x.match(/\d/g))
        .map(d => d[0] + d[d.length - 1])
        .sum();
}

function gold() {
    let nums = '\\d|one|two|three|four|five|six|seven|eight|nine',
        firstNumRE = new RegExp(nums),
        lastNumRE = new RegExp(`^.*(${nums})`);
    nums = Object.fromEntries(
        nums
            .split('|')
            .map((n, i) => [
                [n, i],
                [i, i]
            ])
            .flat()
    );
    return parseInput(
        x => nums[x.match(firstNumRE)[0]] * 10 + nums[x.match(lastNumRE)[1]]
    ).sum();
}

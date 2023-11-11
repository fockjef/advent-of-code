/* --- Day 17: No Such Thing as Too Much --- */

function silver() {
    let containers = parseInput(Number).numericSortAsc(),
        combos = findNumberCombos(150, containers),
        n = 0;
    while (!combos.next().done) {
        n++;
    }
    return n;
}

function gold() {
    let containers = parseInput(Number).numericSortAsc(),
        minCount = Infinity,
        numWays = 0;
    for (let c of findNumberCombos(150, containers)) {
        if (c.length < minCount) {
            minCount = c.length;
            numWays = 1;
        } else if (c.length == minCount) {
            numWays++;
        }
    }
    return numWays;
}

function* findNumberCombos(target, nums, currentNums = []) {
    if (target == 0) {
        yield currentNums;
    } else {
        for (let i = 0; i < nums.length && nums[i] <= target; i++) {
            yield* findNumberCombos(
                target - nums[i],
                nums.slice(i + 1),
                currentNums.concat(nums[i])
            );
        }
    }
}

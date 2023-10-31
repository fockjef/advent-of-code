/* --- Day 24: It Hangs in the Balance --- */

function silver(numGroups = 3) {
    let nums = parseInput(Number).numericSortDesc(),
        target = nums.sum() / numGroups,
        minQE = Infinity;
    for (
        let size = nums.findIndex((_, i) => nums.slice(0, i).sum() >= target);
        size <= nums.length;
        size++
    ) {
        let combos = findNumberCombos(target, nums, size);
        while (1) {
            let c = combos.next().value;
            if (!c) break;
            let groups = makeEqualGroups(
                numGroups - 1,
                nums.filter(n => !c.includes(n))
            );
            if (groups) {
                let QE = [c, ...groups.filter(g => g.length == size)]
                    .map(g => g.prod())
                    .min();
                if (QE < minQE) minQE = QE;
            }
        }
        if (minQE < Infinity) return minQE;
    }
    return null;
}

function gold() {
    return silver(4);
}

function* findNumberCombos(target, nums, maxSize = Infinity, combo = []) {
    if (target == 0) {
        yield combo;
    } else if (combo.length < maxSize) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] <= target) {
                yield* findNumberCombos(
                    target - nums[i],
                    nums.slice(i + 1),
                    maxSize,
                    combo.concat(nums[i])
                );
            }
        }
    }
}

function makeEqualGroups(numGroups, nums) {
    if (numGroups == 1) {
        return [nums];
    } else {
        let target = nums.sum() / numGroups;
        combos = findNumberCombos(target, nums);
        while (1) {
            let c = combos.next().value;
            if (!c || c[0] != nums[0]) break;
            let groups = makeEqualGroups(
                numGroups - 1,
                nums.filter(n => !c.includes(n))
            );
            if (groups) {
                return [c, ...groups];
            }
        }
    }
    return null;
}

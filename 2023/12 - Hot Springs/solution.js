/* --- Day 12: Hot Springs --- */

function silver(numCopies = 1) {
    return parseInput(x => unfoldRecord(x, numCopies))
        .map(({springs, groups}) =>
            numArrangements(springs, groups, groups.sum() + groups.length - 1)
        )
        .sum();
}

function gold() {
    return silver(5);
}

function unfoldRecord(record, numCopies = 1) {
    let [springs, groups] = record.split(' ');
    springs = (springs + '?').repeat(numCopies).slice(0, -1);
    groups = (groups + ',')
        .repeat(numCopies)
        .slice(0, -1)
        .split(',')
        .map(Number);
    return {springs, groups};
}

function numArrangements(springs, groups, minSprings, cache = {}) {
    if (groups.length == 0) {
        return springs.includes('#') ? 0 : 1;
    }
    if (springs[0] == '.') {
        let i = 1;
        while (springs[i] == '.') {
            i++;
        }
        springs = springs.slice(i);
    }
    if (springs.length < minSprings) {
        return 0;
    }
    let key = springs.length + ':' + minSprings;
    if (key in cache) {
        return cache[key];
    }
    for (
        let i = 0, hasBroken = false;
        i < groups[0] && i < springs.length;
        i++
    ) {
        if (springs[i] == '.') {
            springs = springs.slice(i + 1);
            if (hasBroken || springs.length < minSprings) {
                return 0;
            }
            i = -1;
        } else if (!hasBroken && springs[i] == '#') {
            hasBroken = true;
        }
    }
    let numA = 0;
    if (springs.length == groups[0] || springs[groups[0]] != '#') {
        numA = numArrangements(
            springs.slice(groups[0] + 1),
            groups.slice(1),
            minSprings - groups[0] - 1,
            cache
        );
    }
    if (springs[0] == '?') {
        numA += numArrangements(springs.slice(1), groups, minSprings, cache);
    }
    return (cache[key] = numA);
}

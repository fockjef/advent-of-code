/* --- Day 1: Historian Hystseria --- */

function silver() {
    let data = parseInput(x => x.split(/\s+/)),
        listA = data.map(([a, b]) => a).numericSortAsc(),
        listB = data.map(([a, b]) => b).numericSortAsc();
    return listA.map((a, i) => Math.abs(a - listB[i])).sum();
}

function gold() {
    return parseInput(x => x.split(/\s+/))
        .map(([a, _], idx, data) => a * data.filter(([_, b]) => a == b).length)
        .sum();
}

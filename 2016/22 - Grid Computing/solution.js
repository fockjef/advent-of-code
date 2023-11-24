/* --- Day 22: Grid Computing --- */

function silver(){
    return parseInput(x => x.split(/T?\s+/))
        .slice(2)
        .map(([node1, , used], _, nodes) => +used == 0
            ? 0
            : nodes.filter(([node2, , , avail]) => node2 != node1 && +avail >= +used).length
        )
        .sum();
}

function gold(){
    return "?";
}
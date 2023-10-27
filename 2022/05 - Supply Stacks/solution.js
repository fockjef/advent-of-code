/* --- Day 5: Supply Stacks --- */

var silver = () => moveCargo(9000);
var gold = () => moveCargo(9001);

function initStacks(stackDesc) {
    let [stackIds, ...cargoList] = stackDesc.split(/\n/).reverse(),
        stacks = Array.from(new Array(stackIds.match(/\S+/g).length), () => []);
    cargoList.forEach(cargo =>
        stacks.forEach(
            (stack, i) =>
                cargo[i * 4 + 1] != ' ' && stack.push(cargo[i * 4 + 1])
        )
    );
    return stacks;
}

function moveCargo(craneType) {
    let [stackDesc, moves] = parseInput(/\n\n/),
        stacks = initStacks(stackDesc);
    moves
        .split(/\n/)
        .map(move => move.match(/\d+/g))
        .forEach(([cnt, from, to]) => {
            let temp = stacks[from - 1].splice(-cnt);
            if (craneType == 9000) temp.reverse();
            stacks[to - 1].push(...temp);
        });
    return stacks.map(s => s[s.length - 1]).join('');
}

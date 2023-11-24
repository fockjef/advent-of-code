/* --- Day 19: An Elephant Named Joseph --- */

function silver(numElves = parseInput(Number)[0]) {
    return 1 + 2 * (numElves - Math.pow(2, Math.floor(Math.log2(numElves))));

    /* helpful to find the pattern - do not use for large numElves
    let elves = Array.from(new Array(numElves), (_, i) => i + 1);
    while( elves.length > 1 ){
        elves.push(elves.splice(0, 2)[0]);
    }
    return elves[0];
    //*/
}

function gold(numElves = parseInput(Number)[0]) {
    let basis = Math.pow(3, Math.floor(Math.log10(numElves) / Math.log10(3)));
    return numElves == basis
        ? numElves
        : numElves - basis + Math.max(0, numElves - 2 * basis);

    //* helpful to find the pattern - do not use for large numElves
    let elves = Array.from(new Array(numElves), (_, i) => i + 1);
    while (elves.length > 1) {
        elves.splice(elves.length >>> 1, 1);
        elves.push(elves.shift());
    }
    return elves[0];
    //*/
}

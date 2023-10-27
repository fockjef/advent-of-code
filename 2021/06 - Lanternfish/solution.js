/* --- Day 6: Lanternfish --- */

function silver(numDays = 80) {
    let data = parseInput(Number, /,/),
        fish = new Array(9).fill(0);
    data.forEach(x => fish[x]++);
    return numFish(fish, numDays);
}

function gold() {
    return silver(256);
}

function numFish(fish, numDays) {
    for (let d = 0; d < numDays; d++) {
        fish[(d + 7) % fish.length] += fish[d % fish.length];
    }
    return sum(fish);
}

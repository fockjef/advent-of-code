/* --- Day 15: Rambunctious Recitation --- */

function silver(numI = 2020, input = '2,0,1,7,4,14,18') {
    let memory = new Map(),
        nextNum,
        prevNum;
    input = input.split(',').map(Number);
    input.forEach((n, i) => memory.set(n, i));
    nextNum =
        (input.length - 1 - input.lastIndexOf(input[input.length - 1], -2)) %
        input.length;
    for (let i = input.length; i < numI; i++) {
        prevNum = nextNum;
        nextNum = memory.has(nextNum) ? i - memory.get(nextNum) : 0;
        memory.set(prevNum, i);
    }
    return prevNum;
}

function gold() {
    return silver(30000000);
}

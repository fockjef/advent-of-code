/* --- Day 1: Sonar Sweep --- */

var silver = () => compareWindows(1);
var gold = () => compareWindows(3);

const compareWindows = n =>
    parseInput(Number).filter((x, i, data) => i >= n && x > data[i - n]).length;

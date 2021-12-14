/* --- Day 1: Sonar Sweep --- */

// solutions
var silver = () => compareWindows(1)
var gold = () => compareWindows(3)

// helper functions
const compareWindows = (n) => parseInput(Number).filter( ( x, i, data) => i >= n && x > data[i-n]).length;

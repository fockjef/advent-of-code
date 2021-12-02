/* --- Day 1: Sonar Sweep --- */

const compareWindows = (n) => parseInput(Number).filter( ( x, i, data) => i >= n && x > data[i-n]).length;
const day_01a = () => compareWindows(1)
const day_01b = () => compareWindows(3)

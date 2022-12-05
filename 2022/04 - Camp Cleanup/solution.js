/* --- Day 4: Camp Cleanup --- */

var silver = () => parseInput(x=>x.match(/\d+/g)).filter(isSuperset).length;
var gold = () => parseInput(x=>x.match(/\d+/g)).filter(hasOverlap).length;

const isSuperset = ([lo1,hi1,lo2,hi2]) => (+lo1 <= lo2 && +hi1 >= hi2) || (+lo1 >= lo2 && +hi1 <= hi2);
const hasOverlap = ([lo1,hi1,lo2,hi2]) => (+lo1 <= hi2 && +hi1 >= lo2);

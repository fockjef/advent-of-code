/* --- Day 4: Camp Cleanup --- */

var silver = () => countDupes(isSuperset);
var gold = () => countDupes(hasOverlap);

const isSuperset = ([lo1,hi1,lo2,hi2]) => (+lo1 <= lo2 && +hi1 >= hi2) || (+lo1 >= lo2 && +hi1 <= hi2);
const hasOverlap = ([lo1,hi1,lo2,hi2]) => (+lo1 <= hi2 && +hi1 >= lo2);
const countDupes = method => parseInput(x=>x.match(/\d+/g)).filter(method).length;

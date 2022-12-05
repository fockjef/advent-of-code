/* --- Day 2: Rock Paper Scissors --- */

var silver = () => calcScore([4,8,3,1,5,9,7,2,6]);
var gold = () => calcScore([3,4,8,1,5,9,2,6,7]);

const calcScore = scoreMap => parseInput(x=>scoreMap[x[0].charCodeAt()*3+x[2].charCodeAt()-283]).sum();

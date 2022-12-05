/* --- Day 1: Calorie Counting --- */

var silver = () => countCalories(1);
var gold = () => countCalories(3);

const countCalories = n => parseInput(x=>x.split(/\n/).sum(),/\n\n/).numericSortDesc().slice(0,n).sum();

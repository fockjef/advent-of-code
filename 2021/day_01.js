/* --- Day 1: Report Repair --- */

function day_01a(){
	let data = parseInput( Number );
	return data.filter( ( x, i) => i >= 1 && x > data[i-1]).length;
}

function day_01b(){
	let data = parseInput( Number );
	return data.filter( ( x, i) => i >= 3 && x > data[i-3]).length;
}

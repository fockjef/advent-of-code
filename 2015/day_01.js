/* --- Day 1: Not Quite Lisp --- */

function day_01a(){
	return sum( parseInput( x => x === "(" ? 1 : -1, "" ) );
}

function day_01b(){
	let data = parseInput( x => x === "(" ? 1 : -1, "" );
	for( let i = 0, floor = 0; i < data.length; i++ ){
		floor += data[i];
		if( floor < 0 ) return i+1;
	}
}

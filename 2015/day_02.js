/* --- Day 2: I Was Told There Would Be No Math --- */

function day_02a(){
	return sum( parseInput( box => box.split( "x" ).sort( ( a, b ) => a - b ) ).map( dim => 3 * dim[0] * dim[1] + 2 * dim[0] * dim[2] + 2 * dim[1] * dim[2] ) );
}

function day_02b(){
	return sum( parseInput( box => box.split( "x" ).sort( ( a, b ) => a - b ) ).map( dim => 2 * dim[0] + 2 * dim[1] + dim[0] * dim[1] * dim[2] ) );
}

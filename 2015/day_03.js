/* --- Day 3: Perfectly Spherical Houses in a Vacuum --- */

function day_03a( n = 1 ){
	let ns = new Array( n ).fill( 0 ),
	    ew = ns.slice(),
	    visited = new Set( [ ns[0] + ":" + ew[0] ] );
	parseInput( "" ).forEach( ( dir, i ) => {
		i %= n;
		switch( dir ){
			case "^": ns[i]++; break;
			case "v": ns[i]--; break;
			case ">": ew[i]++; break;
			case "<": ew[i]--; break;
		}
		visited.add( ns[i] + ":" + ew[i] );
	});
	return visited.size;
}

function day_03b(){
	return day_03a( 2 );
}

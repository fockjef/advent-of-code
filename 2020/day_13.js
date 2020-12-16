function day_13a(){
	let data = parseInput(),
	    t0 = +data[0];
	return prod( data[1].split( "," ).map( Number ).filter( Boolean ).map( id => [ id, id - t0 % id ] ).sort( ( a, b ) => a[1] - b[1] )[0] );
}

function findCongruence( n1, n2 ){
	for( let i = 0; i < n2[0]; i++ ){
		if( ( n1[0] * i + n1[1] ) % n2[0] === n2[1] ) return [ lcm( n1[0], n2[0] ), n1[0] * i + n1[1] ];
	}
	return [ 0, -1 ];
}

function day_13b(){
	return parseInput()[1]
		.split( "," )
		.map( ( x, i ) => [ +x, ( +x + ( x - i ) % x ) % x ] )
		.filter( x => x[0] )
		.sort( ( a, b ) => b[0] - a[0] )
		.reduce( ( t0, t ) => findCongruence( t0, t ) )[1];
}

function day_13a(){
	let data = parseInput(),
	    t0 = +data[0];
	return prod( data[1].split( "," ).map( Number ).filter( Boolean ).map( id => [ id, id - t0 % id ] ).sort( ( a, b ) => a[1] - b[1] )[0] );
}

function findOffset( factor, offset, mod ){
	factor %= mod;
	offset %= mod;
	for( let i = 0; i < mod; i++ ){
		if( ( factor * i + offset ) % mod === 0 ) return i;
	}
}

function day_13b(){
	let data = parseInput()[1].split( "," ).map( ( x, i ) => x === "x" ? undefined : [ +x, i ] ).filter( Boolean ),
	    factor = 1,
	    offset = 0;
	for( let i = 0; i < data.length; i++ ){
		offset += factor * findOffset( factor, offset + data[i][1], data[i][0] );
		factor *= data[i][0];
	}
	return offset;
}

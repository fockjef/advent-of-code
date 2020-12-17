/* --- Day 17: Conway Cubes --- */

function getNeigh( numDim ){
	let neigh = [ [] ];
	for( let i = 0; i < numDim; i++ ){
		neigh = [].concat( ...neigh.map( n => [ -1, 0, 1 ].map( d => n.concat( d ) ) ) );
	}
	return neigh.filter( n => n.some( Boolean ) );
}

function pos2Id( pos ){
	let numDim = pos.length,
	    maxPos = 2 << ( 50 / numDim >>> 0 ) - 1,
	    offset = maxPos / 2;
	if( pos.length > 8 || pos.some( p => p < -offset || p >= offset ) ) throw new Error( "Invalid position" );
	return ( numDim - 1 ) * 0x4000000000000 + sum( pos.map( ( p, i ) => ( p + offset ) * Math.pow( maxPos, i ) ) );
}

function id2Pos( id ){
	let numDim = 1 + id / 0x4000000000000 >>> 0,
	    maxPos = 2 << ( 50 / numDim >>> 0 ) - 1,
	    offset = maxPos / 2;
	return Array.from( new Array( numDim ), ( p, i ) => ( ( id / Math.pow( maxPos, i ) % maxPos ) >>> 0 ) - offset );
}

function evolve( alive, neigh ){
	let world = [],
	    aliveNext = new Set();
	alive.forEach( id => {
		let pos = id2Pos( id );
		world.push( pos );
		neigh.forEach( offset => world.push( pos.map( ( p, i ) => p + offset[i] ) ) );
	} );
	for( let i = 0; i < world.length; i++ ){
		let pos = world[i],
		    id = pos2Id( pos ),
		    numNeigh = neigh.filter( offset => alive.has( pos2Id( pos.map( ( p, i ) => p + offset[i] ) ) ) ).length;
		if( numNeigh === 3 || ( numNeigh === 2 && alive.has( id ) ) ){
			aliveNext.add( id );
		}
	};
	return aliveNext;
}

function day_17a( numDim = 3, numIter = 6 ){
	let alive = new Set(),
	    neigh = getNeigh( numDim );
	parseInput( x => x.split( "" ) ).forEach( ( row, y ) => {
		row.forEach( ( cell, x ) => {
			if( cell === "#" ) alive.add( pos2Id( [ x, y, 0, 0, 0, 0, 0, 0 ].slice( 0, numDim ) ) );
		} )
	} );
	for( let i = 0; i < numIter; i++ ){
		alive = evolve( alive, neigh );
	}
	return alive.size;
}

function day_17b(){
	return day_17a( 4 );
}

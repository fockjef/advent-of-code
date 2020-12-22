/* --- Day 16: Ticket Translation --- */

function day_16a(){
	let data = parseInput( /\n\n/ ),
	    validNum = new Set();
	data[0].match( /\d+-\d+/g ).forEach( range => {
		let [ beg, end ] = range.split( "-" ).map( Number );
		for( beg; beg <= end; validNum.add( beg++ ) );
	} );
	return sum( data[2].match( /\d+/g ).map( Number ).filter( n => !validNum.has( n ) ) );
}

function day_16b(){
	let data = parseInput( /\n\n/ ),
	    validNum = new Set(),
	    fields = data[0].split( /\n/ ).reduce( ( fields, f ) => {
	    	let [ name, ranges ] = f.split( ":" );
	    	fields[name] = new Set();
	    	ranges.match( /\d+-\d+/g ).forEach( r => {
	    		let [ beg, end ] = r.split( "-" ).map( Number );
	    		for( beg; beg <= end; beg++ ){
	    			validNum.add( beg );
	    			fields[name].add( beg );
	    		}
	    	} );
	    	return fields;
	    }, {} ),
	    tickets = [
	    	...data[1].split( /\n/ ).slice( 1 ).map( t => t.split( "," ).map( Number ) ),
	    	...data[2].split( /\n/ ).slice( 1 ).map( t => t.split( "," ).map( Number ) )
	    ].filter( t => t.every( n => validNum.has( n ) ) ),
	    fmap = Object.keys( fields ).map( ( x, i, F ) => new Set( F ) );
	for( let fnum = 0; fnum < tickets[0].length; fnum++ ){
		for( let i = 0; i < tickets.length; i++ ){
			fmap[fnum].forEach( name => !fields[name].has( tickets[i][fnum] ) && fmap[fnum].delete( name ) )
		}
		while( fmap.findIndex( f => f.size === 1 ) !== -1 ){
			let j = fmap.findIndex( f => f.size === 1 ),
			    name = [ ...fmap[j] ][0];
			fields[name] = j;
			fmap.forEach( f => f.delete( name ) );
		}
	}
	return prod( Object.keys( fields ).filter( name => /^departure/.test( name ) ).map( name => tickets[0][fields[name]] ) );
}

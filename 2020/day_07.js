/* --- Day 7: Handy Haversacks --- */
function day_07a(){
	let data = parseInput( x => x.split(" bags contain") ),
	    stack = [ "shiny gold" ],
	    canHold = new Set();
	while( stack.length ){
		let colorRE = new RegExp( "\\d " + stack.pop() + " bags?" ),
		    cH = data.filter( x => !canHold.has( x[0] ) && colorRE.test( x[1] ) ).map( x => x[0] );
		stack.push( ...cH );
		cH.forEach( c => canHold.add( c ) );
	}
	return canHold.size;
}

function day_07b(){
	let data = parseInput( x => x.split( " bags contain " ) ).reduce( ( X, x ) => { X[x[0]] = x[1].split(", "); return X }, {} ),
	    stack = [ "1 shiny gold bag" ],
	    numBags = 0;
	while( stack.length ){
		let [ , num, color ] = stack.pop().match( /(\d+) (.*) bags?/ ) || [];
		if( num ){
			numBags += +num;
			stack.push( ...data[color].map( x => x.replace( /^\d+/, n=> num * n ) ) );
		}
	}
	return numBags - 1;
}

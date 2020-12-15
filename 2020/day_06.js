/* --- Day 6: Custom Customs --- */

function day_06a(){
	let data = parseInput( null, /\n\n/ );
	return sum( data.map( responses => new Set( responses.match( /[a-z]/g ) ).size ) );
}

function day_06b(){
	let data = parseInput( null, /\n\n/ );
	return sum( data.map( responses => {
		responses = responses.trim().split( /\n/ ).map( r => new Set( r.match( /[a-z]/g ) ) );
		let allY = [ ...responses[0] ];
		for( let i = 1; i < responses.length && allY.length; i++ ){
			allY = allY.filter( yes => responses[i].has( yes ) );
		}
		return allY.length;
	} ) );
}

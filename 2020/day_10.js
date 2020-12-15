/* --- Day 10: Adapter Array --- */

function day_10a(){
	let data = parseInput( Number ).sort( ( a, b ) => a - b );
	data.unshift( 0 );
	data = data.slice( 1 ).map( ( n , i ) => n - data[i] );
	return data.filter( x => x === 1 ).length * ( 1 + data.filter( x => x === 3 ).length );
}

function day_10b(){
	let data = parseInput( Number ).sort( ( a, b ) => a - b ),
	    cnt = {};
	data.unshift( 0 );
	data.forEach( x => cnt[x] = 0 );
	cnt[data[data.length-1]] = 1;
	data.reverse().forEach( ( jolts, i ) => data.slice( i + 1, i + 4 ).filter( j => j + 3 >= jolts ).forEach( j => cnt[j] += cnt[jolts] ) );
	return cnt[0];
}

function day_10b_quasinacci(){
	let data = parseInput( Number ).sort( ( a, b ) => a - b );
	data.unshift( 0 );
	return data.map( ( jolts, i ) => data.slice( Math.max( 0, i - 3 ), i ).filter( j => j + 3 >= jolts ).length ).join( "" ).match( /[23]+/g ).map( str => {
		let seq = [ 0, 1, 1 ];
		str.split( "" ).forEach( amt => seq.push( sum( seq.slice( -amt ) ) ) );
		return seq[seq.length-1];
	} ).reduce( ( prod, n ) => prod * n );
}

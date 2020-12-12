/* --- Day 2: Password Philosophy --- */

function day_02a(){
	let data = parseInput( x => x.split( /[-:\s]+/ ) );
	return data.filter( ( [ min, max, chr, str ] ) => {
		let cnt = ( str.match( new RegExp( chr, "g" ) ) || [] ).length;
		return cnt >= min && cnt <= max;
	} ).length;
}

function day_02b(){
	let data = parseInput( x => x.split( /[-:\s]+/ ) );
	return data.filter( ( [ posA, posB, chr, str ] ) => str[posA-1] === chr ^ str[posB-1] === chr ).length;
}

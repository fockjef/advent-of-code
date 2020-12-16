/* Helper functions */

function parseInput( mapFunc, delim = /\n/ ){
	if( mapFunc !== undefined && typeof mapFunc !== "function" ){
		delim = mapFunc;
		mapFunc = undefined;
	}
	let data = document.body.innerText.trim().split( delim );
	return mapFunc ? data.map( mapFunc ) : data;
}

const sum = x => x.reduce( ( sum, n ) => sum + n );
const prod = x => x.reduce( ( prod, n ) => prod * n );
const gcd = ( a, b ) => b === 0 ? a : gcd( b, a % b );
const lcm = ( a, b ) => a * b / gcd( a, b );

/*
	Load and run solution
	document.head.appendChild( document.createElement( "script" ) ).src = "https://fockjef.net/advent-of-code/AoC.js"
*/

(function loader(){
	let [ , year, day ] = location.href.match( /^https:\/\/(?:www\.)?adventofcode\.com\/(\d{4})\/day\/(\d+)\/input$/ ) || [];
	if( year && day ){
		if( +day < 10 ) day = "0" + day;
		let script = document.head.appendChild( document.createElement( "script" ) );
		script.onload = () => {
			console.log( `day ${day} (a): ` + window[`day_${day}a`]() );
			console.log( `day ${day} (b): ` + window[`day_${day}b`]() );
		};
		script.src = `https://fockjef.net/advent-of-code/${year}/day_${day}.js`;
	}
})();

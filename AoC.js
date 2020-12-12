/* Helper functions */

function parseInput( mapFunc, delim = /\n/ ){
	return document.body.innerText.split( delim ).filter( Boolean ).map( typeof mapFunc === "function" ? mapFunc : x => x );
}

function sum( x ){
	return x.reduce( ( sum, n ) => sum + n );
}

function prod( x ){
	return x.reduce( ( prod, n ) => prod * n );
}

/*
	Load and run solution
	document.head.appendChild( document.createElement( "script" ) ).src = " https://fockjef.net/advent-of-code/AoC.js"
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

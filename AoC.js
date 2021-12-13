/* Helper functions */

const sum = x => x.reduce( ( sum, n ) => sum + n );
const prod = x => x.reduce( ( prod, n ) => prod * n );
const mean = x => sum(x) / x.length;
const median = x => mean(x.slice().sort(numericSortAsc).slice( x.length - 1 >>> 1, (x.length >>> 1) + 1));
const gcd = ( a, b) => b === 0 ? a : gcd( b, a % b );
const lcm = ( a, b) => a * b / gcd( a, b );
const cmp = ( a, b) => a < b ? -1 : a == b ? 0 : 1;
const numericSortAsc = ( a, b) => cmp( a, b);
const numericSortDesc = ( a, b) => cmp( b, a);

const env = typeof window == "undefined" ? "node" : "browser";
let year, day;
if( env == "browser" ){
	[ , year, day] = location.href.match( /^https:\/\/(?:www\.)?adventofcode\.com\/(\d{4})\/day\/(\d+)\/input$/ ) || [];
}
else{
	[ year, day] = process.argv.slice(2).map(Number);
}
if( +day < 10 ) day = "0" + day;

function parseInput( mapFunc, delim = /\n/ ){
	if( mapFunc !== undefined && typeof mapFunc !== "function" ){
		delim = mapFunc;
		mapFunc = undefined;
	}
	let data = env == "browser" ? document.body.innerText : readFile(`${year}/day_${day}.input`);
	data = data.trimEnd().split( delim );
	return mapFunc ? data.map( mapFunc ) : data;
}

function readFile(file){
	return require("fs").readFileSync(file).toString();
}

function runSolutions(){
	if( typeof globalThis[`day_${day}a`] == "function" ) console.log( `day ${day} (a): ` + globalThis[`day_${day}a`]() );
	if( typeof globalThis[`day_${day}b`] == "function" ) console.log( `day ${day} (b): ` + globalThis[`day_${day}b`]() );
}

/*
	Run solution in dev console:
	document.head.appendChild( document.createElement( "script" ) ).src = "https://fockjef.net/advent-of-code/AoC.js"

	Run solution on command line:
	node AoC.js {year} {day}
*/
(function loader(){
	if( year && day ){
		if( env == "browser" ){
			let script = document.head.appendChild( document.createElement( "script" ) );
			script.onload = runSolutions;
			script.src = `https://fockjef.net/advent-of-code/${year}/day_${day}.js`;
		}
		else{
			eval( readFile(`${year}/day_${day}.js`) );
			try{ globalThis[`day_${day}a`] = eval(`day_${day}a`) }catch(e){}
			try{ globalThis[`day_${day}b`] = eval(`day_${day}b`) }catch(e){}
			runSolutions();
		}
	}
})();

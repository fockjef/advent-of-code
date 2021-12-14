/* Helper functions */
const sum = x => x.reduce( ( sum, n ) => sum + n, 0);
const prod = x => x.reduce( ( prod, n ) => prod * n );
const mean = x => sum(x) / x.length;
const median = x => mean(x.slice().sort(numericSortAsc).slice( x.length - 1 >>> 1, (x.length >>> 1) + 1));
const gcd = ( a, b) => b === 0 ? a : gcd( b, a % b );
const lcm = ( a, b) => a * b / gcd( a, b );
const cmp = ( a, b) => a < b ? -1 : a == b ? 0 : 1;
const numericSortAsc = ( a, b) => cmp( a, b);
const numericSortDesc = ( a, b) => cmp( b, a);
const reUpperCase = /^[A-Z]+$/;
const reLowerCase = /^[a-z]+$/;
const isUpperCase = s => reUpperCase.test(s);
const isLowerCase = s => reLowerCase.test(s);

const env = typeof window == "undefined" ? "node" : "browser";
let [ year, day] = env == "browser"
	? (location.href.match( /^https:\/\/(?:www\.)?adventofcode\.com\/(\d{4})\/day\/(\d+)\/input$/ ) || []).slice(1)
	: process.argv.slice(2).map(Number);
if( +day < 10 ) day = "0" + (+day);

function parseInput( mapFunc, delim = /\n/ ){
	if( mapFunc !== undefined && typeof mapFunc !== "function" ){
		delim = mapFunc;
		mapFunc = undefined;
	}
	let data = env == "browser" ? document.body.innerText : readFile(`${year}/${day}/input.txt`);
	data = data.trimRight().split( delim );
	return mapFunc ? data.map( mapFunc ) : data;
}

function readFile(file){
	return fs.readFileSync(file).toString();
}

function green(s){
	return env == "node" ? `\x1b[38;5;2m${s}\x1b[0m` : `%c${s}%c`;
}

function red(s){
	return env == "node" ? `\x1b[38;5;1m${s}\x1b[0m` : `%c${s}%c`;
}

function runSolutions( expected = ""){
	expected = expected.split(/\n/).map( x => x.trim());
	console.log(`AoC ${year} day ${day}`);
	[ "silver", "gold"].forEach( ( s, i) => {
		let answer = globalThis[s]().toString().trim(),
			status = !expected[i]
				? " "
				: `${answer == expected[i] ? green("✓") : red("✗")}`,
			color = env == "node" || expected[i] == undefined
				? ""
				: `color:${answer == expected[i]? "green" : "red"}`;
		console.log( `${(s+"  ").slice(0,6)}: ${status} ${answer}`, color, "");
	});
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
			script.onload = () => {
				let script = document.head.appendChild( document.createElement( "script" ) );
				script.onerror = () => runSolutions();
				script.src = `https://fockjef.net/softcors/?ctype=jsonp&callback=runSolutions&url=https%3A%2F%2Ffockjef.net%2Fadvent-of-code%2F${year}%2F${day}%2Fexpected.txt`;
			};
			script.src = `https://fockjef.net/advent-of-code/${year}/${day}/solution.js`;
		}
		else{
			if( typeof globalThis == "undefined" ) global.globalThis = global;
			globalThis.fs = require("fs");
			eval( readFile(`${year}/${day}/solution.js`) );
			try{ globalThis.silver = eval("silver") }catch(e){}
			try{ globalThis.gold   = eval("gold")   }catch(e){}
			let expected = fs.existsSync(`${year}/${day}/expected.txt`)
				? readFile(`${year}/${day}/expected.txt`)
				: "";
			runSolutions(expected);
		}
	}
})();

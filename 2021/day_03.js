/* --- Day 3: Binary Diagnostic --- */

function filterValues( data, preferBit , bit = 0){
	if( data.length <= 1 ) return parseInt( data[0].join(""), 2);
	let cnt = data.reduce( ( X, x) => X + x[bit], 0),
	    filterBit = cnt >= data.length / 2 ? preferBit : preferBit ^ 1;
    return filterValues( data.filter( x => x[bit] == filterBit), preferBit, bit + 1);
}

function day_03a(){
	let data = parseInput( x => x.split("").map(Number)),
	    cnt = data[0];
	data.slice(1).forEach( x => x.forEach( ( bit, i) => cnt[i] += bit));
	let gamma = parseInt( cnt.map( bit => +(bit > data.length / 2)).join(""), 2);
	return gamma * (Math.pow( 2, cnt.length) - 1 - gamma);
}

function day_03b(){
	let data = parseInput( x => x.split("").map(Number));
	return filterValues( data, 1) * filterValues( data, 0);
}

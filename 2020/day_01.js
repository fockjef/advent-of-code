/* --- Day 1: Report Repair --- */

function day_01a( target = 2020 ){
	let data = parseInput( Number );
	for( let i = 0; i < data.length; i++ ){
		for( let j = i + 1; j < data.length; j++ ){
			if( data[i] + data[j] === target ) return data[i] * data[j];
		}
	}
}

function day_01b( target = 2020 ){
	let data = parseInput( Number );
	for( let i = 0; i < data.length; i++ ){
		for( let j = i + 1; j < data.length; j++ ){
			for( let k = j + 1; k < data.length; k++ ){
				if( data[i] + data[j] + data[k] === target ) return data[i] * data[j] * data[k];
			}
		}
	}
}

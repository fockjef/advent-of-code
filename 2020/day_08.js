/* --- Day 8: Handheld Halting --- */

function processor( code ){
	let acc = 0,
	    i;
	for( i = 0; i < code.length && code[i]; i++ ){
		let [ op, arg ] = code[i];
		code[i] = undefined;
		switch( op ){
			case "acc": acc += +arg; break;
			case "jmp": i += +arg - 1; break;
		}
	}
	return { acc, i };
}

function day_08a(){
	return processor( parseInput( x => x.split(" ") ) ).acc;
}

function day_08b(){
	let code = parseInput( x => x.split(" ") );
	for( let i = 0; i < code.length; i++ ){
		if( code[i][0] !== "acc" ){
			let temp = code.slice();
			temp[i] = [ temp[i][0] === "jmp" ? "nop" : "jmp", temp[i][1] ];
			temp = processor( temp );
			if( temp.i === code.length ) return temp.acc;
		}
	}
}

/* --- Day 18: Operation Order --- */

function day_18a( operators ){
	operators = operators || {
		"+": { precedence: 1, assoc: "L", func: ( a, b ) => a + b },
		"*": { precedence: 1, assoc: "L", func: ( a, b ) => a * b }
	};
	return sum( parseInput( equation => evalNewMath( equation, operators ) ) );
}

function day_18b(){
	return day_18a( {
		"+": { precedence: 2, assoc: "L", func: ( a, b ) => a + b },
		"*": { precedence: 1, assoc: "L", func: ( a, b ) => a * b }
	} );
}

function evalNewMath( equation, operators ){
	return evalRPN( infixToRPN( tokenizer( equation, operators ), operators ), operators );
}

function evalRPN( tokens, operators ){
	let output = [];
	for( let i = 0; i < tokens.length; i++ ){
		if( tokens[i] in operators ){
			output.push( operators[tokens[i]].func( ...output.splice( -operators[tokens[i]].func.length ) ) );
		}
		else{
			output.push( +tokens[i] );
		}
	}
	return output.pop();
}

function infixToRPN( tokens, operators ){
	let output = [],
	    ops = [];
	for( let i = 0; i < tokens.length; i++ ){
		if( tokens[i] in operators ){
			let { precedence, assoc } = operators[tokens[i]];
			while( ops[ops.length-1] in operators && ( operators[ops[ops.length-1]].precedence  >  precedence || ( operators[ops[ops.length-1]].precedence === precedence && assoc === "L" ) ) ){
				output.push( ops.pop() );
			}
			ops.push( tokens[i] );
		}
		else if( tokens[i] === "(" ){
			ops.push( tokens[i] );
		}
		else if( tokens[i] === ")" ){
			while( ops.length && ops[ops.length-1] !== "(" ){
				output.push( ops.pop() );
			}
			ops.pop(); // discard closing ")"
		}
		else{
			output.push( tokens[i] );
		}
	}
	return output.concat( ops.reverse() );
}

function tokenizer( str, operators ){
	return str.match( new RegExp( [ "\\d*\\.?\\d+", "[)(]", ...Object.keys( operators ).map( escapeRegExp ) ].join( "|" ), "g" ) );
}

function escapeRegExp( str ){
	return str.replace( /[.*+\-?^${}()|[\]\\]/g, "\\$&" );
}

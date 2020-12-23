/* --- Day 22: Crab Combat --- */

function day_22a(){
	let decks = parseInput( x => x.split( /\n/ ).slice( 1 ).map( Number ), /\n\n/ );
	while( decks[0].length && decks[1].length ){
		let cards = decks.map( d => d.shift() );
		decks[+( cards[1] > cards[0] )].push( ...cards.sort( ( a, b ) => b - a ) );
	}
	return sum( decks.filter( d => d.length )[0].reverse().map( ( c, i ) => c * ( i + 1 ) ) );
}

function day_22b(){
	let decks = parseInput( x => x.split( /\n/ ).slice( 1 ).map( Number ), /\n\n/ );
	return sum( recWar( decks ).decks.filter( d => d.length )[0].reverse().map( ( c, i ) => c * ( i + 1 ) ) );
}

function recWar( decks ){
	let seenConfig = new Set(),
	    winner;
	while( decks[0].length && decks[1].length ){
		let state = decks.map( d => d.join( "," ) ).join( ":" );
		if( seenConfig.has( state ) ){
			return {
				winner: 0,
				decks: decks
			};
		}
		seenConfig.add( state );
		let cards = decks.map( d => d.shift() );
		winner = cards.some( ( c, i ) => c > decks[i].length ) ?
			+( cards[1] > cards[0] ) :
			recWar( decks.map( ( d, i ) => d.slice( 0, cards[i] ) ) ).winner;
		decks[winner].push( cards[winner], cards[+!winner] );
	}
	return { winner, decks };
}

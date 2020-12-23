/* --- Day 21: Allergen Assessment --- */

function day_21a(){
	let { ingred, allerg } = processFoods();
	allerg = new Set( [].concat( ...Object.values( allerg ) ) );
	return sum( Object.keys( ingred ).filter( i => !allerg.has( i ) ).map( i => ingred[i] ) );
}

function day_21b(){
	let { allerg } = processFoods(),
	    temp = Object.entries( allerg ).map( e => [ e[0], new Set( e[1] ) ] );
	while( temp.some( ( [ , ing ] ) => ing.size === 1 ) ){
		let [ a, [ i ] ] = temp.find( ( [ , ing ] ) => ing.size === 1 );
		allerg[a] = i;
		temp.forEach( ( [ , ing ] ) => ing.delete( i ) );
	}
	return Object.keys( allerg ).sort().map( a => allerg[a] ).join( "," );
}

function processFoods(){
	let ingred = {},
	    allerg = {};
	parseInput().forEach( list => {
		let [ ing, all ] = list.split( " (contains " );
		ing = ing.split( /\s+/ );
		all = all.slice( 0, -1 ).split( /\s*,\s*/ );
		ing.forEach( i => ingred[i] = i in ingred ? ingred[i] + 1 : 1 );
		all.forEach( a => allerg[a] = a in allerg ? allerg[a].filter( i => ing.includes( i ) ) : ing );
	} );
	return { ingred, allerg };
}

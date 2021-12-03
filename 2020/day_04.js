/* --- Day 4: Passport Processing --- */

function day_04a(){
	let data = parseInput( /\n\n/ ),
	    required = [ "byr:", "iyr:", "eyr:", "hgt:", "hcl:", "ecl:", "pid:"],
	    regex = new RegExp( "\\b(?:" + required.join( "|" ) + ")", "g" );
	return data.map( pp => new Set( pp.match( regex ) ) ).filter( pp => required.every( field => pp.has( field ) ) ).length;
}

function day_04b(){
	let data = parseInput( /\n\n/ ),
	    required = {
	    	byr: year => +year >= 1920 && +year <= 2002,
	    	iyr: year => +year >= 2010 && +year <= 2020,
	    	eyr: year => +year >= 2020 && +year <= 2030,
	    	hgt: height => ( height.substr( -2 ) === "cm" && parseInt( height ) >= 150 && parseInt( height ) <= 193 ) || ( height.substr( -2 ) === "in" && parseInt( height ) >= 59 && parseInt( height ) <= 76 ),
	    	hcl: color => /^#[\da-f]{6}$/.test( color ),
	    	ecl: color => /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test( color ),
	    	pid: id => /^\d{9}$/.test( id )
	    };
	return data
		.map( pp => pp.split( /\s+/ ).map( field => field.split( /:/) ).reduce( ( PP, f ) => { PP[f[0]] = f.slice( 1 ).join( "" ); return PP }, {} ) )
		.filter( pp => Object.keys( required ).every( field => field in pp && required[field]( pp[field] ) ) ).length;
}

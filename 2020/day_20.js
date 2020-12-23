/* --- Day 20: Jurassic Jigsaw --- */

const [ TOP, RIGHT, BOTTOM, LEFT ] = [ 0, 1, 2, 3 ];

function day_20a(){
	return prod( getTiles().filter( t => t.adj.length === 2 ).map( t => +t.id ) );
}

function day_20b(){
	let tiles = getTiles(),
	    grid = Array.from( new Array( Math.sqrt( tiles.length ) ), x => new Array( Math.sqrt( tiles.length ) ) ),
	    usedTiles = new Set();

	// place arbitrary corner tile at start of grid
	grid[0][0] = tiles.filter( t => t.adj.length === 2 )[0];
	usedTiles.add( grid[0][0].id );

	// rotate intitial tile so it's right edge matches it's 1st adj tile
	rotate( grid[0][0], grid[0][0].edges.findIndex( e => grid[0][0].adj[0].edges.includes( e ) ), RIGHT );
	// if necessary, flip the tile so it's bottom edge matches it's 2nd adj tile
	if( !grid[0][0].adj[1].edges.includes( grid[0][0].edges[BOTTOM] ) ) grid[0][0].img.reverse();

	// work through the grid diagonally
	for( let i = 0; i <= 2 * grid.length - 3; i++ ){
		let row = 1 + Math.max( 0, i - ( grid.length - 1 ) ),
		    col = Math.min( grid.length - 1, i );
		while( row < grid.length && col > 0 ){
			grid[row][col] = grid[row-1][col].adj.filter( t => !usedTiles.has( t.id ) && grid[row][col-1].adj.includes( t ) )[0];
			// rotate tile so it's left edge matches the tile's left neighbor
			rotate( grid[row][col], grid[row][col].edges.findIndex( e => grid[row][col-1].edges.includes( e ) ), LEFT );
			// if necessary, flip the tile so it's top edge matches the tile's upper neighbor
			if( !grid[row-1][col].edges.includes( grid[row][col].edges[TOP] ) ) grid[row][col].img.reverse();
			usedTiles.add( grid[row++][col--].id );
		}
		// set the ends of the diagonal
		if( i < grid.length - 1 ){
			// top right of diagonal
			grid[0][i+1] = grid[0][i].adj.filter( t => !usedTiles.has( t.id ) )[0];
			// rotate tile so it's left edge matches the tile's left neighbor
			rotate( grid[0][i+1], grid[0][i+1].edges.findIndex( e => grid[0][i].edges.includes( e ) ), LEFT );
			// if necessary, flip the tile so it's top edge doesn't match any other tiles
			if( grid[0][i+1].adj.some( t => t.edges.includes( grid[0][i+1].edges[TOP] ) ) ) grid[0][i+1].img.reverse();
			usedTiles.add( grid[0][i+1].id );

			// bottom left of diagonal
			grid[row][col] = grid[row-1][col].adj.filter( t => !usedTiles.has( t.id ) )[0];
			// rotate tile so it's top edge matches the tile's upper neighbor
			rotate( grid[row][col], grid[row][col].edges.findIndex( e => grid[row-1][col].edges.includes( e ) ), TOP );
			// if necessary, mirror the tile so it's left edge doesn't match any other tiles
			if( grid[row][col].adj.some( t => t.edges.includes( grid[row][col].edges[LEFT] ) ) ) grid[row][col].img = grid[row][col].img.map( row => row.split( "" ).reverse().join( "" ) );
			usedTiles.add( grid[row][col].id );
		}
	}

	// let's go hunt some monsters
	let img = grid
	    	.map( tiles => tiles.map( t => t.img.slice( 1, -1 ).map( r => r.slice( 1, -1 ) ) ) )
	    	.map( imgs => imgs[0].map( ( _, row ) => imgs.map( img => img[row] ).join( "" ) ).join( "" ) ).join( "" ),
	    imgW = Math.sqrt( img.length ),
	    monster = [
	    	"..................#.",
	    	"#....##....##....###",
	    	".#..#..#..#..#..#..."
	    ],
	    monsterMatch = [
	    	monster, monster.slice().reverse(),
	    	rotate( { img: monster }, TOP, RIGHT  ).img, rotate( { img: monster }, TOP, RIGHT  ).img.reverse(),
	    	rotate( { img: monster }, TOP, BOTTOM ).img, rotate( { img: monster }, TOP, BOTTOM ).img.reverse(),
	    	rotate( { img: monster }, TOP, LEFT   ).img, rotate( { img: monster }, TOP, LEFT   ).img.reverse(),
	    ].map( m => new RegExp( m.join( ".{" + ( imgW - m[0].length ) + "}" ).replace( /^\.+|\.+$/g, "" ) ) ).filter( regex => regex.test( img ) )[0],
	    numWavesImg = img.match( /#/g ).length,
	    numWavesMonster = monster.join( "" ).match( /#/g ).length,
	    numMonsters = 0,
	    matchInfo;
	while( matchInfo = img.match( monsterMatch ) ){
		img = img.slice( matchInfo.index + 1 );
		numMonsters++;
	}
	return numWavesImg - numWavesMonster * numMonsters;
}

function getTiles(){
	let tiles = parseInput( /\n\n/ ).map( tile => {
	    	tile = tile.split( /\n/ );
	    	let id = tile[0].slice( 5, -1 ),
	    	    img = tile.slice( 1 ),
	    	    edges = [
			    	[ img[0], img[0].split( "" ).reverse().join( "" ) ].sort()[0],
			    	[ img.map( r => r[r.length-1] ).join( "" ), img.map( r => r[r.length-1] ).reverse().join( "" ) ].sort()[0],
			    	[ img[img.length-1], img[img.length-1].split( "" ).reverse().join( "" ) ].sort()[0],
			    	[ img.map( r => r[0] ).join( "" ), img.map( r => r[0] ).reverse().join( "" ) ].sort()[0],
			    ];
	    	return { id, img, edges };
	    } );
	tiles.forEach( ( t, i ) => t.adj = tiles.filter( ( u, j ) => i !== j && t.edges.some( e => u.edges.includes( e ) ) ) );
	return tiles;
}

function rotate( tile, from, to ){
	let amt = ( 4 + from - to ) % 4;
	switch( amt ){
		case 1:
			tile.img = tile.img[0].split( "" ).map( ( _, c ) => tile.img.map( r => r[c] ).join( "" ) ).reverse();
			break;
		case 2:
			tile.img = tile.img.map( row => row.split( "" ).reverse().join( "" ) ).reverse();
			break;
		case 3:
			tile.img = tile.img[0].split( "" ).map( ( _, c ) => tile.img.map( r => r[c] ).reverse().join( "" ) );
			break;
	}
	if( amt && tile.edges ) tile.edges = tile.edges.slice( amt - 4 ).concat( tile.edges.slice( 0, amt - 4 ) );
	return tile;
}

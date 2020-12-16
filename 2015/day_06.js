/* --- Day 6: Probably a Fire Hazard --- */

function day_06a( W = 1000, H = 1000 ){
	let lights = new Uint32Array( W * H );
	parseInput( x => ( x.match( /(on|off|toggle) (\d+),(\d+) through (\d+),(\d+)/ ) || [] ).slice( 1, 6 ) ).forEach( ( [ cmd, x0, y0, x1, y1 ] ) => {
		for( let i = +y0; i <= +y1; i++ ){
			let block = lights.subarray( i * W + ( +x0 ), i * W + ( +x1 ) + 1 );
			cmd !== "toggle" ? block.fill( +( cmd === "on" ) ) : block.forEach( ( _, i ) => block[i] ^= 1 );
		}
	} );
	return lights.filter( Boolean ).length;
}

function day_06b( W = 1000, H = 1000 ){
	let lights = new Uint32Array( W * H );
	parseInput( x => ( x.match( /(on|off|toggle) (\d+),(\d+) through (\d+),(\d+)/ ) || [] ).slice( 1, 6 ) ).forEach( ( [ cmd, x0, y0, x1, y1 ] ) => {
		let adj = cmd === "off" ? -1 : ( cmd === "on" ? 1 : 2 );
		for( let i = +y0; i <= +y1; i++ ){
			let block = lights.subarray( i * W + ( +x0 ), i * W + ( +x1 ) + 1 );
			block.forEach( ( _, i ) => block[i] = Math.max( 0, block[i] + adj ) );
		}
	} );
	return sum( lights );
}

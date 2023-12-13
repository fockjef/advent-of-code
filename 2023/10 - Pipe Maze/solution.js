/* --- Day 10: Pipe Maze --- */

function silver() {
	let grid = parseInput(x => x.split('')),
		r0 = grid.findIndex(row => row.includes('S')),
		c0 = grid[r0].indexOf('S');
	return calcDist({r: r0, c: c0}, grid)
		.flat()
		.filter(isFinite)
		.max();
}

function gold() {
	let grid = parseInput(x => x.split('')),
		r0 = grid.findIndex(row => row.includes('S')),
		c0 = grid[r0].indexOf('S'),
		dist = calcDist({r: r0, c: c0}, grid),
		numTiles = 0,
		startMates = NSEW.filter(([rInc, cInc, dir]) => {
			let rr = r0 + rInc,
				cc = c0 + cInc;
			return (
				rr >= 0 &&
				rr < grid.length &&
				cc >= 0 &&
				cc < grid[rr].length &&
				pipeMatings['S'][dir].includes(grid[rr][cc])
			);
		}).map(([rInc, cInc, dir]) => dir);

	// properly set start pipe
	grid[r0][c0] = Object.keys(pipeMatings).find(pipe =>
		startMates.every(dir => pipeMatings[pipe][dir] != '')
	);

	dist.forEach((row, r) => {
		let inLoop = 0;
		row.forEach((tile, c) => {
			if (tile == Infinity) {
				if (inLoop) numTiles++;
			} else {
				inLoop ^= '--7FJL|'.indexOf(grid[r][c]) >>> 1;
			}
		});
	});

	return numTiles;
}

const NSEW = [
	[-1, 0, 'N'],
	[1, 0, 'S'],
	[0, 1, 'E'],
	[0, -1, 'W']
];
const pipeMatings = {
	'-': {N: '', S: '', E: '-7J', W: '-FL'},
	7: {N: '', S: '|JL', E: '', W: '-FL'},
	F: {N: '', S: '|JL', E: '-7J', W: ''},
	J: {N: '|7F', S: '', E: '', W: '-FL'},
	L: {N: '|7F', S: '', E: '-7J', W: ''},
	'|': {N: '|7F', S: '|JL', E: '', W: ''},
	S: {N: '|7F', S: '|JL', E: '-7J', W: '-FL'}
};

function calcDist(start, grid) {
	let dist = grid.map(row => row.map(() => Infinity)),
		queue = [{r: start.r, c: start.c, dist: 0}];

	while (queue.length) {
		let {r, c, dist: d} = queue.shift(),
			pipe = grid[r][c];
		if (dist[r][c] > d) {
			dist[r][c] = d;
			NSEW.forEach(([rInc, cInc, dir]) => {
				let rr = r + rInc,
					cc = c + cInc;
				if (
					rr >= 0 &&
					rr < grid.length &&
					cc >= 0 &&
					cc < grid[rr].length &&
					pipeMatings[pipe][dir].includes(grid[rr][cc])
				) {
					queue.push({r: rr, c: cc, dist: d + 1});
				}
			});
		}
	}
	return dist;
}

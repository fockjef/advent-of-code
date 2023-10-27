/* --- Day 1: No Time for a Taxicab --- */

function silver() {
    let pos = {x: 0, y: 0}, // position
        dir = 0; // direction - 0: N, 1: E, 2: S, 3: W
    parseInput(x => x.split(/\s*,\s*/))[0].forEach(cmd => {
        dir = (dir + (cmd.charAt() === 'R' ? 1 : -1) + 4) % 4;
        pos[dir % 2 ? 'x' : 'y'] += cmd.slice(1) * (dir < 2 ? 1 : -1);
    });
    return Math.abs(pos.x) + Math.abs(pos.y);
}

function gold() {
    let data = parseInput(x => x.split(/\s*,\s*/))[0],
        pos = {x: 0, y: 0},
        dir = 0,
        segments = [];
    for (let i = 0; i < data.length; i++) {
        dir = (dir + (data[i][0] === 'R' ? 1 : -1) + 4) % 4;
        let s = {xmin: pos.x, xmax: pos.x, ymin: pos.y, ymax: pos.y};
        s[dir % 2 ? (dir < 2 ? 'xmax' : 'xmin') : dir < 2 ? 'ymax' : 'ymin'] =
            pos[dir % 2 ? 'x' : 'y'] += data[i].slice(1) * (dir < 2 ? 1 : -1);
        let intersect = segments
            .slice(0, -2)
            .filter(
                (seg, j) =>
                    (i ^ j) & 1 &&
                    s.xmin <= seg.xmax &&
                    s.xmax >= seg.xmin &&
                    s.ymin <= seg.ymax &&
                    s.ymax >= seg.ymin
            );
        if (intersect.length) {
            let sortDir = s.xmin === s.xmax ? 'ymin' : 'xmin';
            return (
                Math.abs(s.xmin === s.xmax ? s.xmin : s.ymin) +
                Math.abs(
                    intersect.sort(
                        (a, b) => Math.abs(a[sortDir]) - Math.abs(b[sortDir])
                    )[0][sortDir]
                )
            );
        }
        segments.push(s);
    }
}

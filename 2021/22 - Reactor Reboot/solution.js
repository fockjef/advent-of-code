/* --- Day 22: Reactor Reboot --- */

function silver(maxDim = 50) {
    let data = parseInput(x => [
            x.slice(0, 2),
            ...x.match(/-?\d+/g).map(Number)
        ]),
        steps = data.map(([cmd, x0, x1, y0, y1, z0, z1]) => ({
            cmd,
            x0,
            x1,
            y0,
            y1,
            z0,
            z1
        }));
    return countOn(steps, {
        x0: -maxDim,
        x1: maxDim,
        y0: -maxDim,
        y1: maxDim,
        z0: -maxDim,
        z1: maxDim
    });
}

function gold() {
    return silver(Infinity);
}

function countOn(steps, range) {
    let numOn = 0;
    steps = steps.filter(
        s =>
            range.x1 >= s.x0 &&
            s.x1 >= range.x0 &&
            range.y1 >= s.y0 &&
            s.y1 >= range.y0 &&
            range.z1 >= s.z0 &&
            s.z1 >= range.z0
    );
    for (let i = 0; i < steps.length; i++) {
        let s = steps[i],
            r = {
                x0: Math.max(s.x0, range.x0),
                x1: Math.min(s.x1, range.x1),
                y0: Math.max(s.y0, range.y0),
                y1: Math.min(s.y1, range.y1),
                z0: Math.max(s.z0, range.z0),
                z1: Math.min(s.z1, range.z1)
            },
            cubes = (r.x1 - r.x0 + 1) * (r.y1 - r.y0 + 1) * (r.z1 - r.z0 + 1),
            intersect = countOn(steps.slice(0, i), r);
        numOn += s.cmd == 'on' ? cubes - intersect : -intersect;
    }
    return numOn;
}

/* --- Day 17: Clumsy Crucible --- */

function silver(minRun = 1, maxRun = 3) {
    let grid = parseInput(x => x.split('').map(Number));
    return findPath(
        grid,
        {x: 0, y: 0},
        {x: grid[0].length - 1, y: grid.length - 1},
        minRun,
        maxRun
    ).dist;
}

function gold() {
    return silver(4, 10);
}

const UDLR = [
    [0, -1, 'U', 'D'],
    [0, 1, 'D', 'U'],
    [-1, 0, 'L', 'R'],
    [1, 0, 'R', 'L']
];

function findPath(
    grid,
    start,
    end,
    minRun = 1,
    maxRun = Number.MAX_SAFE_INTEGER
) {
    let nodes = grid.map((row, y) =>
            row.map(
                (node, x) =>
                    new Proxy(
                        {},
                        {
                            get(target, runDir) {
                                if (runDir in target) return target[runDir];
                                return (target[runDir] = new Proxy(
                                    {},
                                    {
                                        get(target, runLen) {
                                            if (runLen in target)
                                                return target[runLen];
                                            return (target[runLen] = {
                                                x,
                                                y,
                                                runDir,
                                                runLen: +runLen,
                                                dist: Infinity,
                                                path: ''
                                            });
                                        }
                                    }
                                ));
                            }
                        }
                    )
            )
        ),
        queue = [nodes[start.y][start.x][''][0]];
    nodes[start.y][start.x][''][0].dist = 0;
    while (queue.length) {
        let {x, y, runDir, runLen, dist, path} = queue
            .sort((a, b) => a.dist - b.dist)
            .shift();
        UDLR.forEach(([xInc, yInc, dir, oppDir]) => {
            if (oppDir != runDir && (dir != runDir || runLen < maxRun)) {
                let rL = runDir == dir ? 1 : minRun,
                    xx = x + xInc * rL,
                    yy = y + yInc * rL;
                if (yy in grid && xx in grid[yy]) {
                    let d = dist,
                        n =
                            nodes[yy][xx][dir][
                                runDir == dir ? runLen + 1 : minRun
                            ];
                    for (let i = 0; i < rL; i++) {
                        d += grid[yy - yInc * i][xx - xInc * i];
                    }
                    if (d < n.dist) {
                        n.dist = d;
                        n.path = path + dir.repeat(rL);
                        queue.push(n);
                    }
                }
            }
        });
    }
    return Object.values(nodes[end.y][end.x])
        .map(Object.values)
        .flat()
        .sort((a, b) => a.dist - b.dist)[0];
}

function calcDist(grid, start) {
    let dist = grid.map(row => row.map(() => Infinity)),
        queue = [start],
        inQueue = new Set(start.x + ':' + start.y);
    dist[start.y][start.x] = 0;
    while (queue.length) {
        let {x, y} = queue.sort((a, b) => a.dist - b.dist).shift();
        d = dist[y][x];
        dist[y][x] = d;
        UDLR.forEach(([xInc, yInc]) => {
            let xx = x + xInc,
                yy = y + yInc;
            if (
                yy in grid &&
                xx in grid[yy] &&
                d + grid[yy][xx] < dist[yy][xx]
            ) {
                dist[yy][xx] = d + grid[yy][xx];
                if (!inQueue.has(xx + ':' + yy)) {
                    queue.push({x: xx, y: yy});
                    inQueue.add(xx + ':' + yy);
                }
            }
        });
    }
    return dist;
}

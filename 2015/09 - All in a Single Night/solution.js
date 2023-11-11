/* --- Day 9: All in a Single Night --- */

function silver() {
    const routes = {};
    parseInput().forEach(route => {
        let [c1, , c2, , dist] = route.split(/\s+/);
        if (!routes[c1]) routes[c1] = {};
        if (!routes[c2]) routes[c2] = {};
        routes[c1][c2] = routes[c2][c1] = +dist;
    });

    let minDist = Infinity;
    for (let route of permute(Object.keys(routes))) {
        let dist = route
            .slice(0, -1)
            .map((c, i) => routes[c][route[i + 1]])
            .sum();
        if (dist < minDist) minDist = dist;
    }
    return minDist;
}

function gold() {
    const routes = {};
    parseInput().forEach(route => {
        let [c1, , c2, , dist] = route.split(/\s+/);
        if (!routes[c1]) routes[c1] = {};
        if (!routes[c2]) routes[c2] = {};
        routes[c1][c2] = routes[c2][c1] = +dist;
    });

    let maxDist = -Infinity;
    for (let route of permute(Object.keys(routes))) {
        let dist = route
            .slice(0, -1)
            .map((c, i) => routes[c][route[i + 1]])
            .sum();
        if (dist > maxDist) maxDist = dist;
    }
    return maxDist;
}

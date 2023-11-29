/* --- Day 11: Radioisotope Thermoelectric Generators --- */

function silver(cleanroom = []) {
    let queue = [{numMoves: 0, elevator: 0, floors: parseFloors()}],
        cache = new Set();
    queue[0].floors[0].push(...cleanroom);
    while (queue.length) {
        let {numMoves, elevator, floors} = queue.shift();
        while (floors[0].length == 0) {
            floors = floors.slice(1);
            elevator--;
        }
        if (floors.length == 1) {
            return numMoves;
        }
        let id = generateId(elevator, floors);
        if (!cache.has(id)) {
            cache.add(id);
            let parts = floors[elevator];
            for (let i = 0, f; i < parts.length; i++) {
                for (let j = i + 1; j < parts.length; j++) {
                    f = moveParts(
                        elevator,
                        elevator + 1,
                        floors,
                        parts[i],
                        parts[j]
                    );
                    if (f)
                        queue.push({
                            numMoves: numMoves + 1,
                            elevator: elevator + 1,
                            floors: f
                        });
                    f = moveParts(
                        elevator,
                        elevator - 1,
                        floors,
                        parts[i],
                        parts[j]
                    );
                    if (f)
                        queue.push({
                            numMoves: numMoves + 1,
                            elevator: elevator - 1,
                            floors: f
                        });
                }
                f = moveParts(elevator, elevator + 1, floors, parts[i]);
                if (f)
                    queue.push({
                        numMoves: numMoves + 1,
                        elevator: elevator + 1,
                        floors: f
                    });
                f = moveParts(elevator, elevator - 1, floors, parts[i]);
                if (f)
                    queue.push({
                        numMoves: numMoves + 1,
                        elevator: elevator - 1,
                        floors: f
                    });
            }
        }
    }
    return null;
}

function gold() {
    return silver([
        {isotope: 'elerium', type: 'generator'},
        {isotope: 'elerium', type: 'microchip'},
        {isotope: 'dilithium', type: 'generator'},
        {isotope: 'dilithium', type: 'microchip'}
    ]);
}

function parseFloors() {
    const rank = ['first', 'second', 'third', 'fourth'].map(r => r.slice(0, 2));
    return parseInput()
        .sort(
            (a, b) => rank.indexOf(a.slice(4, 6)) - rank.indexOf(b.slice(4, 6))
        )
        .map(x =>
            (x.match(/(\w+)(?: generator|-compatible microchip)/g) || []).map(
                p => {
                    let [isotope, type] = p
                        .replace('-compatible', '')
                        .split(' ');
                    return {isotope, type};
                }
            )
        );
}

function generateId(elevator, floors) {
    return (
        elevator +
        '|' +
        floors.length +
        '|' +
        Object.values(
            floors
                .map((f, i) =>
                    f.map(p => ({isotope: p.isotope, type: p.type, floor: i}))
                )
                .flat()
                .reduce((P, p) => {
                    if (!(p.isotope in P)) P[p.isotope] = {isotope: p.isotope};
                    P[p.isotope][p.type] = p.floor;
                    return P;
                }, {})
        )
            .sort(
                (a, b) =>
                    a.generator - b.generator ||
                    a.microchip - b.microchip ||
                    a.isotope.localeCompare(b.isotope)
            )
            .map((p, i) => i + ':' + p.generator + ':' + p.microchip)
            .join('|')
    );
}

function moveParts(src, dst, floors, ...parts) {
    if (src < 0 || src >= floors.length || dst < 0 || dst >= floors.length) {
        return null;
    }
    floors = floors.slice();
    floors[src] = floors[src].filter(p => !parts.includes(p));
    if (!isValidFloor(...floors[src])) {
        return null;
    }
    floors[dst] = floors[dst].concat(parts);
    return isValidFloor(...floors[dst]) ? floors : null;
}

function isValidElevator(...parts) {
    return (
        parts.length == 1 ||
        (parts.length == 2 &&
            (parts[0].isotope == parts[1].isotope ||
                parts[0].type == parts[1].type))
    );
}

function isValidFloor(...parts) {
    let generators = parts
        .filter(p => p.type == 'generator')
        .map(p => p.isotope);
    return (
        generators.length == 0 ||
        parts
            .filter(p => p.type == 'microchip')
            .every(p => generators.includes(p.isotope))
    );
}

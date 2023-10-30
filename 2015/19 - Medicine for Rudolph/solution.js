/* --- Day 19: Medicine for Rudolph --- */

function silver() {
    let [[medicine], , ...subs] = parseInput(x => x.match(/\w+/g)).reverse(),
        molecules = new Set();
    subs.forEach(s =>
        generateMolecules(medicine, s).forEach(m => molecules.add(m))
    );
    return molecules.size;
}

function gold() {
    let elements = [
            ...new Set(parseInput(null)[0].match(/[A-Z][a-z]?/g))
        ].sort(),
        [[medicine], , ...subs] = parseInput(x =>
            x
                .replace(/[A-Z][a-z]?/g, el =>
                    String.fromCharCode(65 + elements.indexOf(el))
                )
                .match(/\w+/g)
        ).reverse(),
        steps = 0;
    subs.sort((a, b) => b[1].length - a[1].length);
    for (let i = 0; i < subs.length; i++) {
        if (medicine.includes(subs[i][1])) {
            medicine = medicine.replace(subs[i][1], subs[i][0]);
            steps++;
            i = medicine == 'e' ? Infinity : -1;
        }
    }
    return steps;
}

function generateMolecules(m, [seq, sub]) {
    let molecules = new Set(),
        pos = m.indexOf(seq);
    while (pos != -1) {
        molecules.add(m.slice(0, pos) + sub + m.slice(pos + seq.length));
        pos = m.indexOf(seq, pos + 1);
    }
    return [...molecules];
}

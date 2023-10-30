/* --- Day 16: Aunt Sue --- */

const MFCSAM = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

function silver(filterAunts = filterAunts1) {
    let aunts = parseInput(x =>
        Object.fromEntries(x.match(/\w+:? \d+/g).map(p => p.split(/\W+/)))
    );
    Object.entries(MFCSAM).forEach(
        ([compound, value]) => (aunts = filterAunts(aunts, compound, value))
    );
    return aunts[0]['Sue'];
}

function gold() {
    return silver(filterAunts2);
}

function filterAunts1(aunts, compound, value) {
    return aunts.filter(a => !(compound in a) || a[compound] == value);
}

function filterAunts2(aunts, compound, value) {
    switch (compound) {
        case 'cats':
        case 'trees':
            return aunts.filter(a => !(compound in a) || a[compound] > value);
        case 'pomeranians':
        case 'goldfish':
            return aunts.filter(a => !(compound in a) || a[compound] < value);
        default:
            return aunts.filter(a => !(compound in a) || a[compound] == value);
    }
}

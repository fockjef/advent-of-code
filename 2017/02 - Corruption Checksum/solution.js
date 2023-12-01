/* --- Day 2: Corruption Checksum --- */

function silver(){
    return parseInput(x => x.split(/\s+/)).map(row => row.max() - row.min()).sum();
}

function gold(){
    return parseInput(x => x.split(/\s+/)).map(row => row.map(d => (row.find(n => n != d && n % d == 0) || 0) / d).sum()).sum();
}

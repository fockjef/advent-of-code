/* --- Day 4: Security Through Obscurity --- */

function silver() {
    return parseInput(x => x.match(/([a-z-]+)-(\d+)\[([a-z]{5})\]/).slice(1, 4))
        .filter(([name, id, cs]) => cs == checksum(name))
        .map(([name, id, cs]) => id)
        .sum();
}

function gold() {
    return parseInput(x =>
        x.match(/([a-z-]+)-(\d+)\[([a-z]{5})\]/).slice(1, 4)
    ).filter(
        ([name, id]) => decrypt(name, id) == 'northpole object storage'
    )[0][1];
}

function checksum(name) {
    return Object.entries(
        name
            .replace(/-/g, '')
            .split('')
            .reduce((freq, c) => {
                freq[c] = (freq[c] || 0) + 1;
                return freq;
            }, {})
    )
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 5)
        .map(e => e[0])
        .join('');
}

function decrypt(name, id) {
    let rot = id % 26;
    return name
        .replace(/-/g, ' ')
        .replace(/[a-z]/g, c =>
            String.fromCharCode(97 + ((c.charCodeAt(0) - 97 + rot) % 26))
        );
}

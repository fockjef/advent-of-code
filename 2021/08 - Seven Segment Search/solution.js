/* --- Day 8: Seven Segment Search --- */

function silver() {
    let data = parseInput(x => x.match(/[a-g]+/g)),
        outputs = [].concat(...data.map(x => x.slice(-4)));
    return outputs.filter(pattern => [2, 3, 4, 7].includes(pattern.length))
        .length;
}

function gold() {
    let data = parseInput(x => x.match(/[a-g]+/g));
    return sum(data.map(d => decode(d.slice(0, 10), d.slice(-4))));
}

function patternToNum(pattern) {
    return sum(
        pattern
            .split('')
            .map(p => p.charCodeAt() - 97) // a -> 0, b -> 1, ... g -> 7
            .map(n => 1 << n)
    );
}

function bitCount(num) {
    let count = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
    return count[num & 0xf] + count[num >>> 4];
}

function decode(patterns, output) {
    let digits = new Array(10).fill(0);
    patterns = patterns.map(patternToNum);
    digits[1] = patterns.splice(
        patterns.findIndex(p => bitCount(p) == 2),
        1
    )[0];
    digits[7] = patterns.splice(
        patterns.findIndex(p => bitCount(p) == 3),
        1
    )[0];
    digits[4] = patterns.splice(
        patterns.findIndex(p => bitCount(p) == 4),
        1
    )[0];
    digits[8] = patterns.splice(
        patterns.findIndex(p => bitCount(p) == 7),
        1
    )[0];
    digits[9] = patterns.splice(
        patterns.findIndex(p => bitCount(p & digits[4]) == 4),
        1
    )[0];
    digits[0] = patterns.splice(
        patterns.findIndex(
            p => bitCount(p) == 6 && bitCount(p & digits[7]) == 3
        ),
        1
    )[0];
    digits[6] = patterns.splice(
        patterns.findIndex(p => bitCount(p) == 6),
        1
    )[0];
    digits[3] = patterns.splice(
        patterns.findIndex(p => bitCount(p & digits[7]) == 3),
        1
    )[0];
    digits[5] = patterns.splice(
        patterns.findIndex(p => bitCount(p & digits[9]) == 5),
        1
    )[0];
    digits[2] = patterns[0];
    return parseInt(
        output.map(p => digits.indexOf(patternToNum(p))).join(''),
        10
    );
}

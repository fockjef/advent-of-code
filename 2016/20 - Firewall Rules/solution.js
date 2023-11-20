/* --- Day 20: Firewall Rules --- */

function silver() {
    return whitelist().next().value.start;
}

function gold() {
    let numIP = 0;
    for (range of whitelist()) {
        numIP += range.end - range.start + 1;
    }
    return numIP;
}

function* whitelist() {
    let blacklist = parseInput(x => {
            let [start, end] = x.split('-').map(Number);
            return {start, end};
        }).sort((a, b) => a.start - b.start),
        {start, end} = blacklist[0];

    if (start > 0) {
        yield {start: 0, end: start - 1};
    }

    for (let i = 1; i < blacklist.length; i++) {
        if (blacklist[i].start <= end + 1) {
            if (blacklist[i].end > end) {
                end = blacklist[i].end;
            }
        } else {
            yield {start: end + 1, end: blacklist[i].start - 1};
            start = blacklist[i].start;
            end = blacklist[i].end;
        }
    }

    if (end < 0xffffffff) {
        yield {start: end + 1, end: 0xffffffff};
    }
}

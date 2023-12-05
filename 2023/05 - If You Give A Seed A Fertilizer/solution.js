/* --- Day 5: If You Give A Seed A Fertilizer --- */

function silver() {
    let data = parseInput(/\n\n/);
    seeds = data[0].match(/\d+/g).map(value => [[+value, +value]]);
    maps = data.slice(1).map(m => new RangeMap(m));
    return seeds
        .map(seed => seedToLocations(seed, maps))
        .flat(2)
        .min();
}

function gold() {
    let data = parseInput(/\n\n/);
    seeds = data[0]
        .match(/\d+ +\d+/g)
        .map(x => x.split(/ +/).map(Number))
        .map(x => [[x[0], x[0] + x[1] - 1]]);
    maps = data.slice(1).map(m => new RangeMap(m));
    return seeds
        .map(seed => seedToLocations(seed, maps))
        .flat(2)
        .min();
}

function seedToLocations(seed, maps) {
    return maps.reduce(
        (ranges, map) => ranges.map(r => map.mapRange(r)).flat(),
        seed
    );
}

function RangeMap(description) {
    [title, ...ranges] = description.split('\n');
    [this.src, this.dst] = title.match(/(\w+)-to-(\w+)/).slice(1);
    ranges = ranges
        .map(range => {
            let [dstStart, srcStart, length] = range.match(/\d+/g).map(Number);
            return {dstStart, srcStart, srcEnd: srcStart + length - 1};
        })
        .sort((a, b) => a.srcStart - b.srcStart);

    // add ranges for unmapped values
    for (let i = 0; i < ranges.length - 1; i++) {
        if (ranges[i].srcEnd + 1 != ranges[i + 1].srcStart) {
            ranges.splice(i + 1, 0, {
                dstStart: ranges[i].srcEnd + 1,
                srcStart: ranges[i].srcEnd + 1,
                srcEnd: ranges[i + 1].srcStart - 1
            });
        }
    }

    // ensure ranges start at 0
    if (ranges[0].srcStart != 0) {
        ranges.unshift({
            dstStart: 0,
            srtStart: 0,
            srcEnd: ranges[0].srcStart - 1
        });
    }

    // extend ranges to Infinity (and beyond!)
    ranges.push({
        dstStart: ranges[ranges.length - 1].srcEnd + 1,
        srcStart: ranges[ranges.length - 1].srcEnd + 1,
        srcEnd: Infinity
    });
    this.ranges = ranges;
    return this;
}

RangeMap.prototype.mapRange = function ([srcStart, srcEnd]) {
    let ranges = [];
    for (let range of this.ranges) {
        if (range.srcStart <= srcStart && srcStart <= range.srcEnd) {
            ranges.push([
                range.dstStart + srcStart - range.srcStart,
                range.dstStart + Math.min(srcEnd, range.srcEnd) - range.srcStart
            ]);
            srcStart = range.srcEnd + 1;
            if (srcStart > srcEnd) return ranges; // guaranteed to return since all ranges extend to Infinity
        }
    }
};

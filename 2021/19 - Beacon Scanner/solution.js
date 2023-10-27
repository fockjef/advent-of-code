/* --- Day 19: Beacon Scanner --- */

function silver() {
    let data = parseInput(
            x =>
                x
                    .split(/\n/)
                    .slice(1)
                    .map(xx => xx.split(',').map(Number)),
            /\n\n/
        ),
        scanners = normalizeAll(data);
    // count unique beacons
    return new Set([].concat(...scanners).map(s => s.join(','))).size;
}

function gold() {
    let data = parseInput(
            x =>
                x
                    .split(/\n/)
                    .slice(1)
                    .map(xx => xx.split(',').map(Number)),
            /\n\n/
        ),
        scanners = normalizeAll(data);
    // find max manhattan distance between scanners
    return Math.max(
        ...[].concat(
            ...scanners.map((s1, i) =>
                scanners
                    .slice(i + 1)
                    .map(
                        s2 =>
                            Math.abs(s1.offset[0] - s2.offset[0]) +
                            Math.abs(s1.offset[1] - s2.offset[1]) +
                            Math.abs(s1.offset[2] - s2.offset[2])
                    )
            )
        )
    );
}

function normalizeAll(scanners) {
    let normalized = [scanners.shift()];
    normalized[0].offset = [0, 0, 0];
    for (let i = 0; i < normalized.length && scanners.length; i++) {
        let refScanner = normalized[i];
        for (let j = 0; j < scanners.length; j++) {
            let s = normalizeScanner(refScanner, scanners[j]);
            if (s) {
                normalized.push(s);
                scanners.splice(j, 1);
                j--;
            }
        }
    }
    return normalized;
}

function normalizeScanner(refScanner, scanner) {
    let scannerAxes = [0, 1, 2].map(axis => scanner.map(xyz => xyz[axis])),
        xAxis,
        yAxis,
        zAxis;
    xAxis = findCommonAxis(
        refScanner.map(xyz => xyz[0]),
        scannerAxes
    );
    if (!xAxis) return undefined;
    yAxis = findCommonAxis(
        refScanner.map(xyz => xyz[1]),
        scannerAxes
    );
    if (!yAxis) return undefined;
    zAxis = findCommonAxis(
        refScanner.map(xyz => xyz[2]),
        scannerAxes
    );
    if (!zAxis) return undefined;
    scanner = xAxis.map((x, i) => [x, yAxis[i], zAxis[i]]);
    scanner.offset = [xAxis.offset, yAxis.offset, zAxis.offset];
    return scanner;
}

// find common axis for a given reference axis
// for each potential axis check both regular and reverse orientation
function findCommonAxis(refAxis, scannerAxes) {
    for (let i = 0; i < scannerAxes.length; i++) {
        for (dir = 1; dir >= -1; dir -= 2) {
            let scanAxis = scannerAxes[i].map(n => dir * n),
                offset = findAxisOffset(refAxis, scanAxis);
            if (offset != undefined) {
                scanAxis = scanAxis.map(n => n + offset);
                scanAxis.offset = offset;
                // remove common axis from axes list
                scannerAxes.splice(i, 1);
                return scanAxis;
            }
        }
    }
    return undefined;
}

// calculate position difference (distance) between every coordinate pair
// quick and dirty, tries prevent double counting (might be buggy still)
function findAxisOffset(axis1, axis2) {
    let diff = {};
    for (let i = 0; i < axis1.length; i++) {
        for (let j = 0; j < axis2.length; j++) {
            let d = axis1[i] - axis2[j];
            if (!(d in diff)) diff[d] = [];
            diff[d].push([i, j]);
            if (
                diff[d].length >= 12 &&
                new Set(diff[d].map(([ii, jj]) => ii)).size >= 12 &&
                new Set(diff[d].map(([ii, jj]) => jj)).size >= 12
            ) {
                return d;
            }
        }
    }
    return undefined;
}

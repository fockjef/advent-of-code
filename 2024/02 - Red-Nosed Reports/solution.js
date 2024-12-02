/* --- Day 2: Red-Nosed Reports --- */

function silver(filter = isSafe) {
    return parseInput(x => x.split(" ")).filter(filter).length;
}

function gold() {
    return silver(isDamperSafe);
}

function isSafe(report) {
    const sign = Math.sign(report[0] - report[1])
    return report.slice(1).map((lvl, i) => sign * (report[i] - lvl)).every(diff => diff >= 1 && diff <= 3);
}

function isDamperSafe(report) {
    return report.some((_, idx) => isSafe(report.toSpliced(idx, 1)));
}
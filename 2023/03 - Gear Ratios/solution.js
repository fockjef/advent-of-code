/* --- Day 3: Gear Ratios --- */

function silver() {
    let sum = 0;
    parseInput().forEach((line, lineNum, schematic) => {
        for (let num of /\d+/.findAll(line)) {
            let syms = findAdjacentSymbols(
                lineNum,
                num.index,
                num.index + num[0].length - 1,
                schematic
            );
            if (syms.length) {
                sum += +num[0];
            }
        }
    });
    return sum;
}

function gold() {
    let sum = 0;
    parseInput().forEach((line, lineNum, schematic) => {
        for (let sym of /[*]/.findAll(line)) {
            let nums = findAdjacentNumbers(
                lineNum,
                sym.index,
                sym.index,
                schematic
            );
            if (nums.length == 2) {
                sum += nums[0] * nums[1];
            }
        }
    });
    return sum;
}

function findAdjacentSymbols(lineNum, startPos, endPos, schematic) {
    startPos = Math.max(startPos - 1, 0);
    endPos = Math.min(endPos + 1, schematic[lineNum].length - 1);
    return (
        [lineNum - 1, lineNum, lineNum + 1]
            .filter(lineNum => 0 <= lineNum && lineNum < schematic.length)
            .map(lineNum => schematic[lineNum].slice(startPos, endPos + 1))
            .join('')
            .match(/[^\d.]/g) || []
    );
}

function findAdjacentNumbers(lineNum, startPos, endPos, schematic) {
    startPos = Math.max(startPos - 1, 0);
    endPos = Math.min(endPos + 1, schematic[lineNum].length - 1);
    return (
        [lineNum - 1, lineNum, lineNum + 1]
            .filter(lineNum => 0 <= lineNum && lineNum < schematic.length)
            .map(lineNum => {
                let line = schematic[lineNum],
                    sP = startPos,
                    eP = endPos;
                while (sP > 0 && /\d/.test(line[sP])) {
                    sP--;
                }
                while (eP < line.length - 1 && /\d/.test(line[eP])) {
                    eP++;
                }
                return line.slice(sP, eP + 1);
            })
            .join('')
            .match(/\d+/g) || []
    );
}

RegExp.prototype.findAll = function* (str) {
    let self = new RegExp(this, 'g');
    while (1) {
        let match = self.exec(str);
        if (match == null) break;
        yield match;
    }
};

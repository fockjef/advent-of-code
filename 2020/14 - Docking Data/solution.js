/* --- Day 14: Docking Data --- */

function silver() {
    let data = parseInput(x => x.split(/\s*=\s*/)),
        andMaskHi = 0xf,
        andMaskLo = 0xffffffff,
        orMaskHi = 0,
        orMaskLo = 0,
        mem = {};
    data.forEach(([cmd, value]) => {
        switch (cmd.slice(0, 3)) {
            case 'mas':
                andMaskHi = parseInt(value.slice(0, 4).replace(/[^0]/g, 1), 2);
                andMaskLo = parseInt(value.slice(4).replace(/[^0]/g, 1), 2);
                orMaskHi = parseInt(value.slice(0, 4).replace(/[^1]/g, 0), 2);
                orMaskLo = parseInt(value.slice(4).replace(/[^1]/g, 0), 2);
                break;
            case 'mem':
                let addr = cmd.slice(4, -1);
                mem[addr] =
                    (((value / 0x100000000) | orMaskHi) & andMaskHi) *
                        0x100000000 +
                    (((value | orMaskLo) & andMaskLo) >>> 0);
                break;
        }
    });
    return sum(Object.values(mem));
}

function gold() {
    let data = parseInput(x => x.split(/\s*=\s*/)),
        mask = '0'.repeat(36);
    mem = {};
    data.forEach(([cmd, value]) => {
        switch (cmd.slice(0, 3)) {
            case 'mas':
                mask = value;
                break;
            case 'mem':
                let addr = cmd.slice(4, -1),
                    tmpMask = mask
                        .split('')
                        .map((bit, i) =>
                            bit === 'X'
                                ? bit
                                : bit | (addr / Math.pow(2, 35 - i)) % 2
                        )
                        .join('')
                        .split('X'),
                    numAddr = Math.pow(2, tmpMask.length - 1);
                for (let i = 0; i < numAddr; i++) {
                    let temp = i,
                        tmpAddr = tmpMask[0];
                    for (let j = 0; j < tmpMask.length - 1; j++) {
                        tmpAddr += (temp % 2) + tmpMask[j + 1];
                        temp >>>= 1;
                    }
                    mem[tmpAddr] = +value;
                }
                break;
        }
    });
    return sum(Object.values(mem));
}

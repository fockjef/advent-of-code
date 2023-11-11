/* --- Day 12: Leonardo's Monorail --- */

function silver(R = {a: 0, b: 0, c: 0, d: 0}) {
    let instr = parseInput(x => x.split(/[ ,]+/));
    for (let i = 0; i < instr.length; i++) {
        switch (instr[i][0]) {
            case 'inc':
                R[instr[i][1]] = (R[instr[i][1]] | 0) + 1;
                break;
            case 'dec':
                R[instr[i][1]] = (R[instr[i][1]] | 0) - 1;
                break;
            case 'cpy':
                R[instr[i][2]] = Number.isInteger(+instr[i][1])
                    ? +instr[i][1]
                    : R[instr[i][1]] | 0;
                break;
            case 'jnz':
                if (Number.isInteger(+instr[i][1])) {
                    if (+instr[i][1] != 0) i += instr[i][2] - 1;
                } else {
                    if ((R[instr[i][1]] | 0) != 0) i += instr[i][2] - 1;
                }
                break;
        }
    }
    return R.a;
}

function gold() {
    return silver({a: 0, b: 0, c: 1, d: 0});
}

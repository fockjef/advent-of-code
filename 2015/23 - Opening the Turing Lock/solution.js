/* --- Day 23: Opening the Turing Lock --- */

function silver(R = {a: 0, b: 0}) {
    let instr = parseInput(x => x.split(/[ ,]+/));
    for (let i = 0; i < instr.length; i++) {
        switch (instr[i][0]) {
            case 'hlf':
                R[instr[i][1]] >>>= 1;
                break;
            case 'inc':
                R[instr[i][1]]++;
                break;
            case 'jie':
                if (R[instr[i][1]] % 2 == 0) i += instr[i][2] - 1;
                break;
            case 'jio':
                if (R[instr[i][1]] == 1) i += instr[i][2] - 1;
                break;
            case 'jmp':
                i += instr[i][1] - 1;
                break;
            case 'tpl':
                R[instr[i][1]] *= 3;
                break;
        }
    }
    return R.b;
}

function gold() {
    return silver({a: 1, b: 0});
}

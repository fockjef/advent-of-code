/* --- Day 25: Clock Signal --- */

function silver() {
    let instr = parseInput(x => x.split(/[ ,]+/));
    for (let a = 0; a < 1e5; a++) {
        let cpu = assembunnyCPU(instr, {a}),
            cpuStates = new Set(),
            goodOutput = true;
        for (let i = 0; i < 1e5 && goodOutput; i++) {
            let res = cpu.next();
            if (res.done || res.value.output != i % 2) {
                goodOutput = false;
            } else {
                let state = [
                    res.value.currentInstr,
                    ...Object.values(res.value.registers)
                ].join(':');
                if (cpuStates.has(state)) {
                    break;
                }
                cpuStates.add(state);
            }
        }
        if (goodOutput) return a;
    }
}

function* assembunnyCPU(instr, R = {}) {
    R = new Proxy(Object.assign({a: 0, b: 0, c: 0, d: 0}, R), {
        get(obj, prop) {
            if (Number.isInteger(+prop)) return +prop;
            if (prop in obj) return obj[prop];
            return 0;
        },
        set(obj, prop, value) {
            if (Number.isInteger(+prop)) return +prop;
            return (obj[prop] = value);
        }
    });

    let cycle = 0;
    for (let i = 0; i < instr.length; i++, cycle++) {
        switch (instr[i][0]) {
            case 'inc':
                R[instr[i][1]]++;
                break;
            case 'dec':
                R[instr[i][1]]--;
                break;
            case 'cpy':
                R[instr[i][2]] = R[instr[i][1]];
                break;
            case 'jnz':
                if (R[instr[i][1]] != 0) i += R[instr[i][2]] - 1;
                break;
            case 'tgl':
                let target = i + R[instr[i][1]];
                if (target >= 0 && target < instr.length) {
                    switch (instr[target].length) {
                        case 2:
                            instr[target][0] =
                                instr[target][0] == 'inc' ? 'dec' : 'inc';
                            break;
                        case 3:
                            instr[target][0] =
                                instr[target][0] == 'jnz' ? 'cpy' : 'jnz';
                            break;
                    }
                }
                break;
            case 'out':
                yield {
                    output: R[instr[i][1]],
                    currentInstr: i,
                    cycle: cycle,
                    registers: R
                };
                break;
        }
    }

    return {
        output: undefined,
        currentInstr: undefined,
        cycle: cycle,
        registers: R
    };
}

/* --- Day 23: Safe Cracking --- */

function silver(){
    let instr = parseInput(x => x.split(/,|\s+/)),
        cpu = assembunnyCPU(instr, {a: 7});
    return cpu.next().state.R.a;
}

function gold(){
    return factorial(12) + 90 * 90;
}

function factorial(n){
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function* assembunnyCPU(instr, R = {}, maxCycles = 1e6){
    R = new Proxy(Object.assign({a: 0, b: 0, c: 0, d: 0}, R), {
        get(obj, prop){
            if( Number.isInteger(+prop) ) return +prop;
            if( prop in obj ) return obj[prop];
            return 0;
        },
        set(obj, prop, value){
            if( Number.isInteger(+prop) ) return +prop;
            return obj[prop] = value;
        }
    });

    let cycle = 0;
    for (let i = 0; i < instr.length && cycle < maxCycles; i++, cycle++) {
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
                if( R[instr[i][1]] != 0 ) i += R[instr[i][2]] - 1;
                break;
            case 'tgl':
                let target = i + R[instr[i][1]];
                if( target >= 0 && target < instr.length){
                    switch(instr[target].length){
                        case 2:
                            instr[target][0] = instr[target][0] == 'inc' ? 'dec' : 'inc';
                            break;
                        case 3:
                            instr[target][0] = instr[target][0] == 'jnz' ? 'cpy' : 'jnz';
                            break;
                    }
                }
                break;
        }
    }
    yield {
        output: undefined,
        currentInstr: undefined,
        cycle,
        R
    };
}

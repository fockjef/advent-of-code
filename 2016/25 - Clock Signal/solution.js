/* --- Day 25: Clock Signal --- */

function silver() {
    let instr = parseInput(x => x.split(/[ ,]+/));
    for(let a = 0; a < 1e5; a++){
        let cpu = assembunnyCPU(instr, {a}),
            cpuStates = new Set(),
            goodOutput = true;
        for(let i = 0; i < 1e5 && goodOutput; i++){
            let res = cpu.next();
            if( res.done || res.value.output != i % 2 ){
                goodOutput = false;
            }
            else{
                if( cpuStates.has(res.value.state) ){
                    break;
                }
                cpuStates.add(res.value.state);
            }
        }
        if( goodOutput ) return a;
    }
}

function* assembunnyCPU(instr, R = {}){
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

    for (let i = 0, cycle = 0; i < instr.length; i++, cycle++) {
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
    }
}

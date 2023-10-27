/* --- Day 24: Arithmetic Logic Unit --- */

function silver(fillDigit = 9) {
    let data = parseInput(),
        input = new Array(14).fill(fillDigit);
    while (1) {
        let [comparisons, z] = alu(data, input);
        if (z == 0) {
            return input.join('');
        }
        // program iteratively grows the "z" value
        // z(n) = M * z(n-1) + input(n) + C(n)
        // to reduce "z" back to 0 we need to find inputs that cause a comparison
        // between z % M and the next input + some offest to equal each other
        // if difference between the 2 compared values is small enough then
        // we can adjust some input to force the 2 compared quantities to equal each other
        let i = comparisons.findIndex(
                (c, i) => i > 0 && c != 0 && -8 <= c && c <= 8
            ),
            adj = comparisons[i];
        if (1 <= input[i] + adj && input[i] + adj <= 9) {
            input[i] += adj;
        } else {
            for (let j = i - 1; j >= 0; j--) {
                if (1 <= input[j] - adj && input[j] - adj <= 9) {
                    input[j] -= adj;
                    let newComp = alu(data, input)[0];
                    if (newComp[i] == 0) {
                        j = 0;
                    } else {
                        input[j] += adj;
                        if (j == 0) {
                            console.log(input, comparisons, newComp);
                            throw new Error('Cannot find valid model number');
                        }
                    }
                }
            }
        }
    }
}

function gold() {
    return silver(1);
}

function alu(program, input) {
    let registers = {
            w: 0,
            x: 0,
            y: 0,
            z: 0
        },
        comparisons = [];
    input = input.slice();
    program.forEach(instr => {
        let [cmd, dest, param] = instr.split(' ');
        switch (cmd) {
            case 'inp':
                registers[dest] = input.shift();
                break;
            case 'add':
                if (param in registers) param = registers[param];
                registers[dest] += Number(param);
                break;
            case 'mul':
                if (param in registers) param = registers[param];
                registers[dest] *= param;
                break;
            case 'div':
                if (param in registers) param = registers[param];
                registers[dest] = Math.trunc(registers[dest] / param);
                break;
            case 'mod':
                if (param in registers) param = registers[param];
                registers[dest] %= param;
                break;
            case 'eql':
                if (dest == 'x' && param == 'w')
                    comparisons.push(registers.x - registers.w);
                if (param in registers) param = registers[param];
                registers[dest] = registers[dest] == param ? 1 : 0;
                break;
        }
    });
    return [comparisons, registers.z];
}

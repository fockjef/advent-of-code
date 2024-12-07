/* --- Day 3: Mull It Over --- */

function silver(){
    return runProgram(parseInput(null)[0]);
}

function gold(){
    return runProgram(parseInput(null)[0].replace(/don't\(\).*?(do\(\)|$)/gs, ""));
}

function runProgram(program){
    return program.match(/mul\(\d+,\d+\)/g).map(mul => mul.match(/\d+/g).prod()).sum();
}

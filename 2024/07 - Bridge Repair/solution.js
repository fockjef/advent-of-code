/* --- Day 7: Bridge Repair --- */

function silver(numOps = 2){
    return parseInput(x => x.match(/\d+/g).map(Number)).filter(eq => testEquation(numOps, ...eq)).map(eq => eq[0]).sum();
}

function gold(){
    return silver(3);
}

function testEquation(numOps, goal, ...values){
    for(let i = 0; i < Math.pow(numOps, values.length-1); i++){
        let ops = i,
            res = values[0];
        for(let j = 1; j < values.length; j++){
            switch(ops % numOps){
                case 0: res += values[j]; break;
                case 1: res *= values[j]; break;
                default: res = Number(`${res}${values[j]}`);
            }
            ops = (ops / numOps) >>> 0;
        }
        if(res == goal) return true;
    }
    return false;
}
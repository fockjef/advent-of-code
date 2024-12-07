/* --- Day 7: Bridge Repair --- */

function silver(numOps = 2){
    return parseInput(x => x.match(/\d+/g).map(Number)).filter(testEquation.bind({}, numOps)).map(x => x[0]).sum();
}

function gold(){
    return silver(3);
}

function testEquation(numOps, values){
    let [target, acc] = values;

    function compute(acc, idx){
        if(acc > target) return false;
        if(idx == values.length) return acc == target;
        return compute(acc * values[idx], idx + 1) ||
               compute(acc + values[idx], idx + 1) ||
               (numOps > 2 && compute(acc * Math.pow(10, Math.ceil(Math.log10(values[idx] + .5))) + values[idx], idx + 1));
    }

    return compute(acc, 2);
}

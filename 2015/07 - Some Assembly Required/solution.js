/* --- Day 7: Some Assembly Required --- */

function silver(signalB){
    let wires = parseInput(x => x.split(/\s+->\s+/)),
        signals = {};
    if( signalB != undefined ){
        wires.find(wire => wire[1] == "b")[0] = signalB.toString();
    }
    while( wires.length ){
        wires = reduceWires(wires, signals);
    }
    return signals["a"];
}

function gold(){
    return silver(silver());
}

function reduceWires(wires, signals){
    let wiresDone = [],
        wiresOpen = [];
    wires.forEach(wire => {
        if( typeof wire[0] == "string" ){
            wire[0] = computeSignal(wire[0]);
            (typeof wire[0] == "number" ? wiresDone : wiresOpen).push(wire);
        }
    });
    wiresDone.forEach(([signal, wire]) => {
        let wRE = new RegExp(`\\b${wire}\\b`, "g");
        wiresOpen.forEach(wire => wire[0] = wire[0].replace(wRE, signal));
        signals[wire] = signal;
    });
    return wiresOpen;
}

function computeSignal(signal){
    if( !/[a-z]/.test(signal) ){
        signal = signal.toString().split(/\s+/);
        switch(signal[1]){
            case undefined: signal = +signal[0]; break;
            case "AND": signal = signal[0] & signal[2]; break;
            case "OR": signal = signal[0] | signal[2]; break;
            case "LSHIFT": signal = signal[0] << signal[2]; break;
            case "RSHIFT": signal = signal[0] >>> signal[2]; break;
            default: signal = ~signal[1]; break;
        }
        signal &= 0xFFFF;
    }
    return signal;
}
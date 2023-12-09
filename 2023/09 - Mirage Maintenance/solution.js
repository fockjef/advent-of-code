/* --- Day 9: Mirage Maintenance --- */

function silver(){
    return parseInput(x => x.split(/ +/).map(Number)).map(nextValue).sum();
}

function gold(){
    return parseInput(x => x.split(/ +/).map(Number)).map(prevValue).sum();
}

function nextValue(sequence){
    if( sequence.every(val => val == sequence[0]) ){
        return sequence[0];
    }
    return sequence[sequence.length-1] + nextValue(sequence.slice(1).map((val ,i) => val - sequence[i]));
}

function prevValue(sequence){
    if( sequence.every(val => val == sequence[0]) ){
        return sequence[0];
    }
    return sequence[0] - prevValue(sequence.slice(1).map((val ,i) => val - sequence[i]));
}

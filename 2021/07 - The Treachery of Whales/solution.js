/* --- Day 7: The Treachery of Whales --- */

function silver(){
    let data = parseInput( Number, ",").sort(numericSortAsc);
    return fuelCostSimple( data, data[data.length - 1 >>> 1]);
}

function gold(){
    let data = parseInput( Number, ","),
        avg = sum(data) / data.length;
    if( !Number.isInteger(avg) ){
        let precentBelowAvg = data.filter( x => x < avg ).length / data.length;
        switch( Math.sign(precentBelowAvg - 0.5) ){
            case  1: avg = Math.floor(avg); break;
            case -1: avg = Math.ceil (avg); break;
            default: avg = Math.round(avg); break;
        }
    }
    return fuelCostAdditive( data, avg);
}

function fuelCostSimple( crabs, pos){
    return sum( crabs.map( function fuelCost(p){
        return Math.abs(pos - p);
    }));
    
}

function fuelCostAdditive( crabs, pos){
    return sum( crabs.map( function fuelCost(p){
        let diff = Math.abs(pos - p);
        return diff * (diff + 1) / 2;
    }));
}

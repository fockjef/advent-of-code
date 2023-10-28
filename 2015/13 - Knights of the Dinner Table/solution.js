/* --- Day 13: Knights of the Dinner Table --- */

function silver(){
    return maxHappiness(parseHappinessList());
}

function gold(){
    let happy = parseHappinessList();
    happy["You"] = {};
    Object.keys(happy).forEach(p => happy[p]["You"] = happy["You"][p] = 0)
    return maxHappiness(happy);
}

function parseHappinessList(){
    return parseInput().reduce((happy, entry) => {
        let [p1, , sign, amt, , , , , , , p2] = entry.split(/[\s+.]/);
        if( !(p1 in happy) ) happy[p1] = {};
        happy[p1][p2] = sign == "gain" ? +amt : -amt;
        return happy;
    }, {});
}

function maxHappiness(happy){
    let seats = permute(Object.keys(happy)),
        maxHappiness = -Infinity;
    while(1){
        let s = seats.next().value;
        if( !s ) break;
        let happiness = s.map((p, i) => happy[p][s[(i+1)%s.length]] + happy[p][s[(i-1+s.length)%s.length]]).sum();
        if( happiness > maxHappiness ) maxHappiness = happiness;
    }
    return maxHappiness;
}
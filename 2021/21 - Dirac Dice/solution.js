/* --- Day 21: Dirac Dice --- */

function silver(){
    let positions = parseInput( x => Number(x.slice(28))),
        scores = [ 0, 0],
        rollNum = 0,
        die = 1;
    while( scores[0] < 1000 && scores[1] < 1000 ){
        let pId = rollNum % 2;
        positions[pId] = (positions[pId] + 3 * die + 3) % 10 || 10;
        scores[pId] += positions[pId];
        die = (die + 3) % 100 || 100;
        rollNum++;
    }
    return Math.min(...scores) * 3 * rollNum;
}

function gold(){
    let multiverse = [{
            positions: parseInput( x => Number(x.slice(28))),
            scores: [ 0, 0],
            rollNum: 0,
            frequency: 1
        }],
        numWins = [ 0, 0];
    while( multiverse.length ){
        let { positions, scores, rollNum, frequency} = multiverse.pop(),
            pId = rollNum % 2;
        rolls.forEach( r => {
            let p = positions.slice(),
                s = scores.slice();
            p[pId] = (p[pId] + r.value) % 10 || 10;
            s[pId] += p[pId];
            if( s[pId] >= 21 ){
                numWins[pId] += frequency * r.frequency;
            }
            else{
                multiverse.push({
                    positions: p,
                    scores: s,
                    rollNum: rollNum + 1,
                    frequency: frequency * r.frequency
                });
            }
        })
    }
    return Math.max(...numWins);
}

const rolls = [
    { value: 3, frequency: 1},
    { value: 4, frequency: 3},
    { value: 5, frequency: 6},
    { value: 6, frequency: 7},
    { value: 7, frequency: 6},
    { value: 8, frequency: 3},
    { value: 9, frequency: 1},
];
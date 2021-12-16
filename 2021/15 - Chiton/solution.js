/* --- Day 15: Chiton --- */

function silver(){
    let data = parseInput( x => x.split("").map(Number)),
        risk = data.map( row => row.slice().fill(Infinity)),
        queue = [[ 0, 0, -data[0][0]]];
    while( queue.length ){
        let [ r, c, riskLevel] = queue.shift();
        riskLevel += data[r][c];
        if( riskLevel < risk[r][c] ){
            risk[r][c] = riskLevel;
            for( let n = 0; n < neighborhood.length; n++ ){
                let [ rr, cc] = neighborhood[n];
                rr += r;
                cc += c;
                if( rr >= 0 && cc >= 0 && rr < data.length && cc < data[0].length && riskLevel + data[rr][cc] < risk[rr][cc] ){
                    queue.push( [ rr, cc, riskLevel]);
                }
            }
        }
    }
    return risk;
}

const neighborhood = [
    [ -1,  0], // U
    [  1,  0], // D
    [  0, -1], // L
    [  0,  1]  // R
];

console.log(silver());
throw new Error("TEST");
/* --- Day 8: Resonant Collinearity --- */

function silver(resonance = false){
    let data = parseInput(x => x.split("")),
        antennae = {},
        antinodes = new Set();

    data.forEach((row, y) => row.forEach((cell, x) => {
            if( cell != "." ){
                if( !(cell in antennae) ) antennae[cell] = [];
                antennae[cell].push({x, y});
            }
    }));

    Object.values(antennae).forEach(freq => {
        for(let i = 0; i < freq.length - 1; i++){
            for(let j = i + 1; j < freq.length; j++){
                let dX = freq[i].x - freq[j].x,
                    dY = freq[i].y - freq[j].y;
                for(let k = resonance ? 0 : 1; k < (resonance ? data.length : 2); k++){
                    let x0 = freq[i].x + k * dX,
                        y0 = freq[i].y + k * dY,
                        x1 = freq[j].x - k * dX,
                        y1 = freq[j].y - k * dY;
                    if(0 <= x0 && x0 < data[0].length && 0 <= y0 && y0 < data.length) antinodes.add(`${x0},${y0}`);
                    if(0 <= x1 && x1 < data[0].length && 0 <= y1 && y1 < data.length) antinodes.add(`${x1},${y1}`);
                }
            }
        }
    })

    return antinodes.size;
}

function gold(){
    return silver(resonance=true);
}
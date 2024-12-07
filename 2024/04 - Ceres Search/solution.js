/* --- Day 4: Ceres Search --- */

function silver(){
    let data = parseInput(x => x.split("")),
        mask = [
            [[0, 0], [0, 1], [0, 2], [0, 3]], // horizontal
            [[0, 0], [1, 0], [2, 0], [3, 0]], // vertical
            [[0, 0], [1, 1], [2, 2], [3, 3]], // diagonal right
            [[0, 0], [1,-1], [2,-2], [3,-3]]  // diagonal left
        ],
        pattern = /XMAS|SAMX/;
    return countWords(data, mask, pattern);
}

function gold(){
    let data = parseInput(x => x.split("")),
        mask = [
            [[1, 1], [0, 0], [0, 2], [2, 2], [2, 0]]
        ],
        pattern = /A(?:MMSS|MSSM|SMMS|SSMM)/;
    return countWords(data, mask, pattern);
}

function countWords(data, mask, pattern){
    let count = 0;
    for(let r = 0; r < data.length; r++){
        for(let c = 0; c < data[0].length; c++){
            count += mask
                    .map(m => m.map(([rinc, cinc]) => [r+rinc, c+cinc]))
                    .filter(m => m.every(([r, c]) => 0 <= r && r < data.length && 0 <= c && c < data[0].length))
                    .map(m => m.map(([r, c]) => data[r][c]).join(""))
                    .filter(word => pattern.test(word))
                    .length;
        }
    }
    return count;
}

/* --- Day 13: Transparent Origami --- */

function silver(){
    let data = parseInput(/\n\n/),
        dots = data[0].split(/\n/).map( d => d.split(",").map(Number)),
        folds = data[1].split(/\n/);
    makeFold( folds[0], dots);
    return new Set(dots.map( d => d.join(":"))).size;
}

function gold(){
    let data = parseInput(/\n\n/),
        dots = data[0].split(/\n/).map( d => d.split(",").map(Number)),
        folds = data[1].split(/\n/);
    folds.forEach( fold => makeFold( fold, dots));
    let minRow = Math.min( ...dots.map(d=>d[1])),
        maxRow = Math.max( ...dots.map(d=>d[1])),
        minCol = Math.min( ...dots.map(d=>d[0])),
        maxCol = Math.max( ...dots.map(d=>d[0])),
        sheet = Array.from( new Array(maxRow - minRow + 1), x => new Array(maxCol - minCol + 1).fill("0")),
        code = "";
    dots.forEach( d => sheet[d[1] - minRow][d[0] - minCol] = "1");
    for( let i = 0; i < sheet[0].length; i += 5 ){
        code += identifyLetter( sheet.map( row => row.slice( i, i + 5 )));
    }
    return code;
}

function makeFold( fold, dots){
    let [ foldAxis, foldLine] = fold.slice(11).split("=");
    if( foldAxis == "x" ){
        let minX = Math.min( 0, ...dots.map( d => d[0]));
        foldLine -= minX;
        dots.filter( d => d[0] > foldLine).forEach( d => d[0] -= 2 * (d[0] - foldLine));
    }
    else{
        let minY = Math.min( 0, ...dots.map( d => d[1]));
        foldLine -= minY;
        dots.filter( d => d[1] > foldLine).forEach( d => d[1] -= 2 * (d[1] - foldLine));
    }
}

const alphabet = {
	"ciiuii": "A",
	"sisiis": "B",
	"ciggic": "C",
	"ugsggu": "E",
	"ugsggg": "F",
	"cigmie": "G",
	"iiuiii": "H",
	"6222ic": "J",
	"ikokki": "K",
	"gggggu": "L",
	"ciiiic": "O",
	"siisgg": "P",
	"siiski": "R",
	"eggc2s": "S",
	"iiiiic": "U",
	"hha444": "Y",
	"u248gu": "Z"
};

function identifyLetter( letter){
    while( letter[0].length < 5 ){
        letter.forEach( row => row[row.length] = 0);
    }
    let id = letter.map( row => parseInt( row.join(""), 2).toString(32)).join("");
    return id in alphabet ? alphabet[id] : "?";
}
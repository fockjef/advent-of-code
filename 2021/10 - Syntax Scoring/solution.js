/* --- Day 10: Syntax Scoring --- */

function silver(){
    return sum(
        parseInput()
        .map(checkSyntax)
        .filter( x => !x.isValid && x.error.corrupt)
        .map(scoreCorrupt)
    );
}

function gold(){
    return median(
        parseInput()
        .map(checkSyntax)
        .filter( x => !x.isValid && !x.error.corrupt)
        .map(scoreIncomplete)
    );
}

function checkSyntax(x){
    const tagPairs = /\(\)|\[\]|\{\}|<>/g;
    while( tagPairs.test(x) ){
        x = x.replace( tagPairs, "");
    }
    if( x.length == 0 ){
        return { isValid: true };
    }
    return {
        isValid: false,
        error: x.match( /^(?<incomplete>[\(\[\{<]*)(?<corrupt>.*)/).groups
    };
}

function scoreCorrupt(x){
    const score = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    };
    return score[x.error.corrupt.charAt()];
}

function scoreIncomplete(x){
    const score = {
        "(": "1",
        "[": "2",
        "{": "3",
        "<": "4"
    };
    return parseInt( x.error.incomplete.split("").map( tag => score[tag]).reverse().join(""), 5);
}

/* --- Day 4: Giant Squid --- */

function day_04a(){
	let data = parseInput(/\n\n/),
	    randNums = data[0].split(",").map(Number),
        bingoCards = data.slice(1).map( card => card.split(/\n/).map( x => x.match(/\d+/g).map(Number)));
    for( let i = 0; i < randNums.length; i++ ){
        let num = randNums[i];
        for( let j = 0; j < bingoCards.length; j++ ){
            let card = bingoCards[j],
                row = card.findIndex( row => row.includes(num));
            if( row != -1 ){
                let col = card[row].indexOf(num);
                card[row][col] = -1;
                if( card[row].every( n => n == -1) || card.every( row => row[col] == -1) ){
                    console.log( card, num);
                    return sum([].concat( ...card).filter( x => x != -1)) * num;
                }
            }
        }
    }
}

function day_04b(){
	let data = parseInput(/\n\n/),
	    randNums = data[0].split(",").map(Number),
        bingoCards = data.slice(1).map( card => card.split(/\n/).map( x => x.match(/\d+/g).map(Number)));
    for( let i = 0; i < randNums.length; i++ ){
        let num = randNums[i];
        for( let j = 0; j < bingoCards.length; j++ ){
            let card = bingoCards[j],
                row = card.findIndex( row => row.includes(num));
            if( row != -1 ){
                let col = card[row].indexOf(num);
                card[row][col] = -1;
                if( card[row].every( n => n == -1) || card.every( row => row[col] == -1) ){
                    bingoCards.splice( j--, 1);
                    if( bingoCards.length == 0 ){
                        console.log( card, num);
                        return sum([].concat( ...card).filter( x => x != -1)) * num;
                    }
                }
            }
        }
    }
}

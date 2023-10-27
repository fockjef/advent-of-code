/* --- Day 4: Giant Squid --- */

function silver() {
    let data = parseInput(/\n\n/),
        randNums = data[0].split(',').map(Number),
        bingoCards = data
            .slice(1)
            .map(card =>
                card.split(/\n/).map(x => x.match(/\d+/g).map(Number))
            );
    for (let i = 0; i < randNums.length; i++) {
        let num = randNums[i];
        for (let j = 0; j < bingoCards.length; j++) {
            let card = bingoCards[j],
                row = card.find(row => row.includes(num));
            if (row) {
                let col = row.indexOf(num);
                row[col] = -1;
                if (row.every(n => n == -1) || card.every(r => r[col] == -1)) {
                    return sum([].concat(...card).filter(x => x != -1)) * num;
                }
            }
        }
    }
}

function gold() {
    let data = parseInput(/\n\n/),
        randNums = data[0].split(',').map(Number),
        bingoCards = data
            .slice(1)
            .map(card =>
                card.split(/\n/).map(x => x.match(/\d+/g).map(Number))
            );
    for (let i = 0; i < randNums.length; i++) {
        let num = randNums[i];
        for (let j = 0; j < bingoCards.length; j++) {
            let card = bingoCards[j],
                row = card.find(row => row.includes(num));
            if (row) {
                let col = row.indexOf(num);
                row[col] = -1;
                if (row.every(n => n == -1) || card.every(r => r[col] == -1)) {
                    bingoCards.splice(j--, 1);
                    if (bingoCards.length == 0) {
                        return (
                            sum([].concat(...card).filter(x => x != -1)) * num
                        );
                    }
                }
            }
        }
    }
}

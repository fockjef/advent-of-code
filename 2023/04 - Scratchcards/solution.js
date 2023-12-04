/* --- Day 4: Scratchcards --- */

function silver() {
    return parseInput(x => x.split(/[:|]/))
        .map(card => {
            let winningNums = new Set(card[1].match(/\d+/g)),
                numWins = card[2]
                    .match(/\d+/g)
                    .filter(n => winningNums.has(n)).length;
            return numWins ? 1 << (numWins - 1) : 0;
        })
        .sum();
}

function gold() {
    let cards = parseInput(x => x.split(/[:|]/)),
        multiplier = cards.map(() => 1);
    cards.forEach((card, i) => {
        let winningNums = new Set(card[1].match(/\d+/g)),
            numWins = card[2]
                .match(/\d+/g)
                .filter(n => winningNums.has(n)).length;
        for (let j = 0; j < numWins; j++) {
            multiplier[i + 1 + j] += multiplier[i];
        }
    });
    return multiplier.sum();
}

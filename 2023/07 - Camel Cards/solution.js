/* --- Day 7: Camel Cards --- */

function silver() {
    return calculateWinnings(handStrength);
}

function gold() {
    return calculateWinnings(handStrengthWildcard);
}

function calculateWinnings(handStrength, hands = parseInput()) {
    return hands
        .map(h => h.split(/ +/))
        .map(([hand, bid]) => ({hand, bid, strength: handStrength(hand)}))
        .sort(
            (a, b) =>
                a.strength[0] - b.strength[0] || a.strength[1] - b.strength[1]
        )
        .map((hand, i) => hand.bid * (i + 1))
        .sum();
}

function handStrength(hand) {
    const cards = '23456789TJQKA';
    let sortedHand = hand.split('').sort().join(''),
        subStrength = parseInt(
            '1' +
                hand
                    .split('')
                    .map(c => cards.indexOf(c).toString(cards.length))
                    .join(''),
            cards.length
        );
    if (/(.)\1{4}/.test(sortedHand)) {
        return [70, subStrength];
    }
    if (/(.)\1{3}/.test(sortedHand)) {
        return [60, subStrength];
    }
    if (/(.)\1{2}(.)\2|(.)\3(.)\4{2}/.test(sortedHand)) {
        return [50, subStrength];
    }
    if (/(.)\1{2}/.test(sortedHand)) {
        return [40, subStrength];
    }
    if (/(.)\1.*(.)\2/.test(sortedHand)) {
        return [30, subStrength];
    }
    if (/(.)\1/.test(sortedHand)) {
        return [20, subStrength];
    }
    return [10, subStrength];
}

function handStrengthWildcard(hand) {
    const cards = 'J23456789TQKA';
    let sortedHand = hand.replace(/J/g, '').split('').sort().join(''),
        subStrength = parseInt(
            '1' +
                hand
                    .split('')
                    .map(c => cards.indexOf(c).toString(cards.length))
                    .join(''),
            cards.length
        ),
        numWildcard = hand.length - sortedHand.length,
        mostFreqCard =
            sortedHand.length == 0
                ? 'J'
                : Object.entries(
                      sortedHand.split('').reduce((count, c) => {
                          count[c] = (count[c] || 0) + 1;
                          return count;
                      }, {})
                  ).sort((a, b) => b[1] - a[1])[0][0];

    return [
        handStrength(sortedHand + mostFreqCard.repeat(numWildcard))[0],
        subStrength
    ];
}

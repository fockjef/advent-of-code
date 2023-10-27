/* --- Day 21: Dirac Dice --- */

function silver() {
    let data = parseInput(x => Number(x.slice(28))),
        players = [
            {score: 0, position: data[0]},
            {score: 0, position: data[1]}
        ],
        die = 1,
        rollNum = 0;
    while (players[(rollNum + 1) % 2].score < 1000) {
        die = rollD100(players[rollNum % 2], die);
        rollNum++;
    }
    return players[rollNum % 2].score * 3 * rollNum;
}

function gold() {
    let multiverse = [
            {
                positions: parseInput(x => Number(x.slice(28))),
                scores: [0, 0],
                rollNum: 0,
                frequency: 1
            }
        ],
        numWins = [0, 0];
    while (multiverse.length) {
        let {positions, scores, rollNum, frequency} = multiverse.pop(),
            pId = rollNum % 2;
        rolls.forEach(r => {
            let p = positions.slice(),
                s = scores.slice();
            p[pId] = (p[pId] + r.value) % 10 || 10;
            s[pId] += p[pId];
            if (s[pId] >= 21) {
                numWins[pId] += frequency * r.frequency;
            } else {
                multiverse.push({
                    positions: p,
                    scores: s,
                    rollNum: rollNum + 1,
                    frequency: frequency * r.frequency
                });
            }
        });
    }
    return Math.max(...numWins);
}

const rolls = [
    {value: 3, frequency: 1},
    {value: 4, frequency: 3},
    {value: 5, frequency: 6},
    {value: 6, frequency: 7},
    {value: 7, frequency: 6},
    {value: 8, frequency: 3},
    {value: 9, frequency: 1}
];

function rollD100(player, die) {
    player.score += player.position =
        1 + ((player.position + 3 * (die + 1) - 1) % 10);
    return 1 + ((die + 3 - 1) % 100);
}

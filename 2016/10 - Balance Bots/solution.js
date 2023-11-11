/* --- Day 10: Balance Bots --- */

function silver() {
    return runBots().myBot.id;
}

function gold() {
    let {outputs} = runBots();
    return [0, 1, 2].map(id => outputs[id]).prod();
}

function runBots() {
    let bots = {},
        outputs = {},
        myBot,
        id,
        val,
        typeL,
        idL,
        typeH,
        idH;
    parseInput().forEach(instr => {
        switch (instr.slice(0, 3)) {
            case 'val':
                [val, id] = instr.match(/\d+/g);
                if (!(id in bots)) {
                    bots[id] = {id, chips: []};
                }
                bots[id].chips.push(+val);
                break;
            case 'bot':
                [id, typeL, idL, typeH, idH] = instr.match(
                    /(?<=(?:low|high) to )(?:bot|output)|\d+/g
                );
                if (!(id in bots)) {
                    bots[id] = {id, chips: []};
                }
                bots[id].high = {type: typeH, id: idH};
                bots[id].low = {type: typeL, id: idL};
                break;
        }
    });
    let MAX_STEPS = 1e3;
    while (stepBots(bots, outputs) && MAX_STEPS--) {
        if (myBot == undefined) {
            myBot = Object.values(bots).find(
                b =>
                    b.chips.length == 2 &&
                    b.chips.numericSortAsc().join('') == '1761'
            );
        }
    }
    return {myBot, outputs};
}

function stepBots(bots, outputs) {
    return Object.values(bots)
        .filter(b => b.chips.length == 2)
        .map(clone)
        .map(b => {
            let [high, low] = b.chips.numericSortDesc();
            if (b.high.type == 'bot') {
                bots[b.high.id].chips.push(high);
            } else {
                outputs[b.high.id] = high;
            }
            if (b.low.type == 'bot') {
                bots[b.low.id].chips.push(low);
            } else {
                outputs[b.low.id] = low;
            }
            bots[b.id].chips.length = 0;
        }).length;
}

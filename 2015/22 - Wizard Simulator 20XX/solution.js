/* --- Day 22: Wizard Simulator 20XX --- */

const spells = [
    {name: 'Magic Missile', cost: 53, damage: 4},
    {name: 'Drain', cost: 73, damage: 2, heal: 2},
    {name: 'Shield', cost: 113, effect: {turns: 6, armor: 7}},
    {name: 'Poison', cost: 173, effect: {turns: 6, damage: 3}},
    {name: 'Recharge', cost: 229, effect: {turns: 5, mana: 101}}
];

function silver(extraDamage = 0) {
    let boss = Object.fromEntries(
            parseInput(x =>
                x
                    .replace(/^[A-Z]/, c => c.toLowerCase())
                    .replace(/\s/g, '')
                    .split(':')
            )
        ),
        games = [
            {
                turn: 0,
                mana: 500,
                totalCost: 0,
                selfHP: 50,
                bossHP: +boss.hitPoints,
                bossDamage: +boss.damage,
                extraDamage: extraDamage,
                spells: {}
            }
        ],
        minCost = Infinity,
        seen = new Map();
    while (games.length) {
        let game = games.shift();
        if (game.totalCost < minCost) {
            doTurn(game).forEach(g => {
                if (g.bossHP <= 0) {
                    if (g.totalCost < minCost) {
                        minCost = g.totalCost;
                    }
                } else if (g.selfHP > 0) {
                    let fp = fingerprint(g);
                    if (!seen.has(fp) || seen.get(fp) > g.totalCost) {
                        seen.set(fp, g.totalCost);
                        games.push(g);
                    }
                }
            });
        }
    }
    return minCost;
}

function gold() {
    return silver(1);
}

function doTurn(game) {
    game.turn++;
    let isPlayerTurn = game.turn % 2 == 1,
        mana = game.mana,
        selfArmor = 0;
    // deal extra damage to player
    if (isPlayerTurn && game.extraDamage) {
        game.selfHP -= game.extraDamage;
        if (game.selfHP <= 0) {
            return [game];
        }
    }
    // apply spell effects
    Object.keys(game.spells).forEach(name => {
        let s = game.spells[name];
        if (s.armor) selfArmor += s.armor;
        if (s.damage) game.bossHP -= s.damage;
        if (s.mana) game.mana += s.mana;
        s.turns--;
        if (s.turns == 0) {
            delete game.spells[name];
        }
    });
    if (isPlayerTurn) {
        // cast a spell
        return spells
            .filter(s => s.cost < mana && !(s.name in game.spells))
            .map(s => {
                let g = clone(game);
                g.mana -= s.cost;
                g.totalCost += s.cost;
                if (s.damage) g.bossHP -= s.damage;
                if (s.heal) g.selfHP += s.heal;
                if (s.effect) g.spells[s.name] = clone(s.effect);
                return g;
            });
    } else {
        // boss attacks player
        game.selfHP -= Math.max(1, game.bossDamage - selfArmor);
        return [game];
    }
}

function fingerprint(g) {
    return [
        g.mana,
        g.selfHP,
        g.bossHP,
        ...Object.keys(g.spells)
            .sort()
            .map(n => n + g.spells[n].turns)
    ].join(':');
}

/* --- Day 21: RPG Simulator 20XX --- */

const shop = {
    weapons: [
        {name: 'Dagger', cost: 8, damage: 4, armor: 0},
        {name: 'Shortsword', cost: 10, damage: 5, armor: 0},
        {name: 'Warhammer', cost: 25, damage: 6, armor: 0},
        {name: 'Longsword', cost: 40, damage: 7, armor: 0},
        {name: 'Greataxe', cost: 74, damage: 8, armor: 0}
    ],
    armor: [
        {name: 'Leather', cost: 13, damage: 0, armor: 1},
        {name: 'Chainmail', cost: 31, damage: 0, armor: 2},
        {name: 'Splintmail', cost: 53, damage: 0, armor: 3},
        {name: 'Bandedmail', cost: 75, damage: 0, armor: 4},
        {name: 'Platemail', cost: 102, damage: 0, armor: 5},
        {name: 'None', cost: 0, damage: 0, armor: 0}
    ],
    rings: [
        {name: 'Damage +1', cost: 25, damage: 1, armor: 0},
        {name: 'Damage +2', cost: 50, damage: 2, armor: 0},
        {name: 'Damage +3', cost: 100, damage: 3, armor: 0},
        {name: 'Armor +1', cost: 20, damage: 0, armor: 1},
        {name: 'Armor +2', cost: 40, damage: 0, armor: 2},
        {name: 'Armor +3', cost: 80, damage: 0, armor: 3}
    ]
};

function silver() {
    let equipment = getEquipmentCombos(),
        boss = Object.fromEntries(
            parseInput(x =>
                x
                    .replace(/^[A-Z]/, c => c.toLowerCase())
                    .replace(/\s/g, '')
                    .split(':')
            )
        );
    return equipment
        .filter(e => battleBoss(boss, e))
        .map(e => e.cost)
        .min();
}

function gold() {
    let equipment = getEquipmentCombos(),
        boss = Object.fromEntries(
            parseInput(x =>
                x
                    .replace(/^[A-Z]/, c => c.toLowerCase())
                    .replace(/\s/g, '')
                    .split(':')
            )
        );
    return equipment
        .filter(e => !battleBoss(boss, e))
        .map(e => e.cost)
        .max();
}

function getEquipmentCombos() {
    let equipment = [];
    shop.weapons.forEach(w => {
        shop.armor.forEach(a => {
            shop.rings.forEach((r1, i) => {
                shop.rings.slice(i + 1).forEach(r2 => {
                    equipment.push({
                        items: [w, a, r1, r2],
                        cost: w.cost + a.cost + r1.cost + r2.cost,
                        damage: w.damage + a.damage + r1.damage + r2.damage,
                        armor: w.armor + a.armor + r1.armor + r2.armor
                    });
                });
                equipment.push({
                    items: [w, a, r1],
                    cost: w.cost + a.cost + r1.cost,
                    damage: w.damage + a.damage + r1.damage,
                    armor: w.armor + a.armor + r1.armor
                });
            });
            equipment.push({
                items: [w, a],
                cost: w.cost + a.cost,
                damage: w.damage + a.damage,
                armor: w.armor + a.armor
            });
        });
    });
    return equipment;
}

function battleBoss(boss, equip) {
    let selfHP = 100,
        bossHP = boss.hitPoints,
        selfDamage = Math.max(1, equip.damage - boss.armor),
        bossDamage = Math.max(1, boss.damage - equip.armor);
    while (selfHP > 0 && bossHP > 0) {
        bossHP -= selfDamage;
        selfHP -= bossDamage;
    }
    return bossHP <= 0;
}

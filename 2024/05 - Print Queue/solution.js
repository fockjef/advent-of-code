/* --- Day 5: Print Queue --- */

function silver(){
    let [rules, updates] = parseInput(/\n\n/);
    rules = rules.split(/\n/).map(x => x.split("|").map(Number));
    updates = updates.split(/\n/).map(x => x.split(",").map(Number));

    return updates
        .filter(u => rules.every(r => obeysRule(r, u)))
        .map(u => u[u.length >>> 1])
        .sum();
}

function gold(){
    let [rules, updates] = parseInput(/\n\n/);
    rules = rules.split(/\n/).map(x => x.split("|").map(Number));
    updates = updates.split(/\n/).map(x => x.split(",").map(Number));

    return updates
        .filter(u => !rules.every(r => obeysRule(r, u)))
        .map(fixUpdate.bind({}, rules))
        .map(u => u[u.length >>> 1])
        .sum();
}

function obeysRule(rule, update){
    let idx = rule.map(page => update.indexOf(page));
    return idx[0] == -1 || idx[1] == -1 || idx[0] < idx[1];
}

function fixUpdate(rules, update){
    while(1){
        let rule = rules.find(r => !obeysRule(r, update));
        if(!rule) return update;
        let idx = rule.map(page => update.indexOf(page));
        update.splice(idx[1], 0, ...update.splice(idx[0], 1))
    }
}

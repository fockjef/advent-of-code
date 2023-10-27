/* --- Day 19: Monster Messages --- */

function silver() {
    let [rules, data] = parseInput(x => x.split(/\n/), /\n\n/),
        r0,
        len;
    rules = rules
        .map(x => x.split(':'))
        .reduce((R, [id, rule]) => {
            R[id] =
                '(?:' +
                rule
                    .replace(/(\d+)/g, '(?:$1)')
                    .replace(/\s+/g, '')
                    .replace(/"/g, '') +
                ')';
            return R;
        }, {});
    r0 = new RegExp('^' + interpolate(rules[0], rules) + '$');
    return data.filter(x => r0.test(x)).length;
}

function gold() {
    let [rules, data] = parseInput(x => x.split(/\n/), /\n\n/),
        prefix,
        suffix,
        len;
    rules = rules
        .map(x => x.split(':'))
        .reduce((R, [id, rule]) => {
            R[id] =
                '(?:' +
                rule
                    .replace(/(\d+)/g, '(?:$1)')
                    .replace(/\s+/g, '')
                    .replace(/"/g, '') +
                ')';
            return R;
        }, {});
    // rules[ 0] = "8 11"
    // rules[ 8] = "42 | 42 8" --> "42+"
    // rules[11] = "42 31 | 42 11 31" ie "42+ 31+" (with equal number of 42 & 31 )
    // :. rules[0] = "42+ 31+" ( with number of 42 greater than number 31 )
    prefix = new RegExp('^' + interpolate(rules[42], rules));
    suffix = new RegExp(interpolate(rules[31], rules) + '$');
    return data.filter(x => {
        let numPrefix = 0,
            numSuffix = 0,
            len;
        while (prefix.test(x)) {
            x = x.replace(prefix, '');
            numPrefix++;
        }
        while (suffix.test(x)) {
            x = x.replace(suffix, '');
            numSuffix++;
        }
        return x.length === 0 && numSuffix > 0 && numPrefix > numSuffix;
    }).length;
}

function interpolate(rule, rules) {
    let len = 0;
    while (rule.length !== len) {
        len = rule.length;
        rule = rule.replace(/(\d+)/g, (_, id) => rules[id]);
    }
    return rule;
}

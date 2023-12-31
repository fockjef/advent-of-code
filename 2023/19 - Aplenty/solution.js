/* --- Day 19: Aplenty --- */

function silver() {
    let [flows, parts] = parseInput('\n\n');

    flows = flows.split('\n').reduce((flows, f) => {
        let [, name, rules] = f.match(/(\w+)\{(.*)\}/);
        flows[name] = rules
            .split(',')
            .map(x => x.match(/(?:([xmas])([<>])(\d+):)?(\w+)/).slice(1));
        return flows;
    }, {});

    parts = parts
        .split('\n')
        .map(p => p.replace(/=/g, '":').replace(/([{,])/g, '$1"'))
        .map(JSON.parse);

    return parts
        .filter(p => isAccepted(flows, p))
        .map(p => Object.values(p).sum())
        .sum();
}

function gold() {
    let flows = parseInput('\n\n')[0]
        .split('\n')
        .reduce((flows, f) => {
            let [, name, rules] = f.match(/(\w+)\{(.*)\}/);
            flows[name] = rules
                .split(',')
                .map(x => x.match(/(?:([xmas])([<>])(\d+):)?(\w+)/).slice(1));
            return flows;
        }, {});

    return numAccepted(flows, {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000]
    });
}

function isAccepted(flows, part, flow = 'in') {
    if (flow == 'A') {
        return true;
    }
    if (flow == 'R') {
        return false;
    }
    for (let i = 0; i < flows[flow].length; i++) {
        let [category, cmp, cutoff, dest] = flows[flow][i];
        if (
            category == undefined ||
            (cmp == '<' && part[category] < cutoff) ||
            (cmp == '>' && part[category] > cutoff)
        ) {
            return isAccepted(flows, part, dest);
        }
    }
}

function numAccepted(flows, part, flow = 'in') {
    if (flow == 'A') {
        return Object.values(part)
            .map(p => p[1] - p[0] + 1)
            .prod();
    }
    if (flow == 'R') {
        return 0;
    }
    let numA = 0;
    part = JSON.parse(JSON.stringify(part));
    for (let i = 0; i < flows[flow].length; i++) {
        let [category, cmp, cutoff, dest] = flows[flow][i];
        cutoff = +cutoff;
        switch (cmp) {
            case '<':
                if (part[category][0] < cutoff) {
                    if (part[category][1] < cutoff) {
                        return numA + numAccepted(flows, part, dest);
                    }
                    let temp = part[category][1];
                    part[category][1] = cutoff - 1;
                    numA += numAccepted(flows, part, dest);
                    part[category] = [cutoff, temp];
                }
                break;
            case '>':
                if (part[category][1] > cutoff) {
                    if (part[category][0] > cutoff) {
                        return numA + numAccepted(flows, part, dest);
                    }
                    let temp = part[category][0];
                    part[category][0] = cutoff + 1;
                    numA += numAccepted(flows, part, dest);
                    part[category] = [temp, cutoff];
                }
                break;
            default:
                numA += numAccepted(flows, part, dest);
        }
    }
    return numA;
}

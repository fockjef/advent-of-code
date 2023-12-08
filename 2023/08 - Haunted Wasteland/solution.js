/* --- Day 8: Haunted Wasteland --- */

function silver(currentNode = 'AAA', endNode = /ZZZ/) {
    let [LR, network] = parseInput('\n\n'),
        numSteps = 0;
    LR = LR.replace(/L/g, 0).replace(/R/g, 1);
    network = Object.fromEntries(
        network.split('\n').map(x => {
            x = x.split(/\W+/);
            return [x[0], x.slice(1, 3)];
        })
    );
    while (!endNode.test(currentNode)) {
        currentNode = network[currentNode][LR[numSteps++ % LR.length]];
    }
    return numSteps;
}

function gold() {
    let currentNodes = parseInput('\n\n')[1].match(/\w+A(?= +=)/g);
    return currentNodes.map(node => silver(node, /..Z/)).reduce(lcm, 1);
}

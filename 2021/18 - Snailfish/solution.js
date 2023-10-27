/* --- Day 18: Snailfish --- */

function silver() {
    let data = parseInput(),
        num = new SnailfishNumber(data[0]);
    for (let i = 1; i < data.length; i++) {
        num.add(data[i]).reduce();
    }
    return num.magnitude();
}

function gold() {
    let data = parseInput(),
        maxMagnitude = -Infinity;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (j != i) {
                let magnitude = new SnailfishNumber(data[i])
                    .add(data[j])
                    .reduce()
                    .magnitude();
                if (magnitude > maxMagnitude) {
                    maxMagnitude = magnitude;
                }
            }
        }
    }
    return maxMagnitude;
}

const SnailfishNumber = (function () {
    function parse(str) {
        let nodes = [],
            depth = 0,
            val = '';
        str.split('').forEach(token => {
            switch (token) {
                case '[':
                    depth++;
                    break;
                case ']':
                    if (val) {
                        nodes.push({value: Number(val), depth});
                        val = '';
                    }
                    depth--;
                    break;
                case ',':
                    if (val) {
                        nodes.push({value: Number(val), depth});
                        val = '';
                    }
                    break;
                default:
                    val += token;
            }
        });
        return nodes;
    }
    function explodeAll(nodes) {
        while (1) {
            let i = nodes.findIndex(
                (n, i) => n.depth > 4 && nodes[i + 1].depth == n.depth
            );
            if (i == -1) return;
            if (i > 0) nodes[i - 1].value += nodes[i].value;
            if (i + 2 < nodes.length) nodes[i + 2].value += nodes[i + 1].value;
            nodes[i].value = 0;
            nodes[i].depth--;
            nodes.splice(i + 1, 1);
        }
    }
    function split(nodes) {
        let i = nodes.findIndex(n => n.value >= 10);
        if (i == -1) return false;
        nodes.splice(i + 1, 0, {
            value: (nodes[i].value + 1) >>> 1,
            depth: nodes[i].depth + 1
        });
        nodes[i].value >>>= 1;
        nodes[i].depth++;
        return true;
    }
    function magnitude(nodes) {
        while (1) {
            let maxDepth = Math.max(...nodes.map(n => n.depth));
            if (maxDepth == 1)
                return 3 * nodes[0].value + 2 * nodes[nodes.length - 1].value;
            let i = nodes.findIndex(n => n.depth == maxDepth);
            nodes[i].value = nodes[i].value * 3 + nodes[i + 1].value * 2;
            nodes[i].depth--;
            nodes.splice(i + 1, 1);
        }
    }
    function SnailfishNumber(str) {
        this.nodes = parse(str);
    }
    SnailfishNumber.prototype.add = function (str) {
        this.nodes.push(...parse(str));
        this.nodes.forEach(n => n.depth++);
        return this;
    };
    SnailfishNumber.prototype.reduce = function () {
        do {
            explodeAll(this.nodes);
        } while (split(this.nodes));
        return this;
    };
    SnailfishNumber.prototype.magnitude = function () {
        return magnitude(this.nodes);
    };
    return SnailfishNumber;
})();

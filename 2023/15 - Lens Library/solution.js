/* --- Day 15: Lens Library --- */

function silver() {
    return parseInput()[0].split(',').map(hash).sum();
}

function gold() {
    let boxes = Array.from(new Array(256), () => []);
    parseInput()[0]
        .split(',')
        .forEach(instr => {
            let [label, op, val] = instr
                    .match(/([a-z]+)([=-])(\d+)?/)
                    .splice(1),
                box = boxes[hash(label)],
                idx = box.findIndex(b => b.label == label);
            if (op == '-') {
                if (idx != -1) {
                    box.splice(idx, 1);
                }
            } else {
                if (idx == -1) {
                    box.push({label, val});
                } else {
                    box[idx].val = val;
                }
            }
        });
    return boxes
        .map((box, boxId) =>
            box
                .map((lens, lensId) => (boxId + 1) * (lensId + 1) * lens.val)
                .sum()
        )
        .sum();
}

function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = ((h + str.charCodeAt(i)) * 17) % 256;
    }
    return h;
}

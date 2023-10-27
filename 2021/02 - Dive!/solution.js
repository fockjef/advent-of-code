/* --- Day 2: Dive! --- */

function silver() {
    let depth = 0,
        hpos = 0;
    parseInput(x => x.split(' ')).forEach(([cmd, X]) => {
        switch (cmd.charAt(0)) {
            case 'u':
                depth -= X;
                break;
            case 'd':
                depth += +X;
                break;
            default:
                hpos += +X;
        }
    });
    return depth * hpos;
}

function gold() {
    let depth = 0,
        hpos = 0,
        aim = 0;
    parseInput(x => x.split(' ')).forEach(([cmd, X]) => {
        switch (cmd.charAt(0)) {
            case 'u':
                aim -= X;
                break;
            case 'd':
                aim += +X;
                break;
            default:
                hpos += +X;
                depth += aim * X;
        }
    });
    return depth * hpos;
}

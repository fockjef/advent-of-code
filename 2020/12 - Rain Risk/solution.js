/* --- Day 12: Rain Risk --- */

function silver() {
    let data = parseInput(x => [x.charAt(), +x.slice(1)]),
        x = 0,
        y = 0,
        theta = 0;
    data.forEach(([cmd, amt]) => {
        switch (cmd) {
            case 'N':
                y += amt;
                break;
            case 'S':
                y -= amt;
                break;
            case 'E':
                x += amt;
                break;
            case 'W':
                x -= amt;
                break;
            case 'L':
                theta += amt;
                break;
            case 'R':
                theta -= amt;
                break;
            case 'F':
                x += amt * Math.cos((Math.PI * theta) / 180);
                y += amt * Math.sin((Math.PI * theta) / 180);
                break;
        }
    });
    return +(Math.abs(x) + Math.abs(y)).toFixed(7);
}

function gold() {
    let data = parseInput(x => [x.charAt(), +x.slice(1)]),
        posS = [0, 0],
        posW = [10, 1],
        r,
        theta;
    data.forEach(([cmd, amt]) => {
        switch (cmd) {
            case 'N':
                posW[1] += amt;
                break;
            case 'S':
                posW[1] -= amt;
                break;
            case 'E':
                posW[0] += amt;
                break;
            case 'W':
                posW[0] -= amt;
                break;
            case 'L':
                amt *= -1;
            case 'R':
                r = Math.sqrt(posW[0] * posW[0] + posW[1] * posW[1]);
                theta = Math.atan2(posW[1], posW[0]) - (Math.PI * amt) / 180;
                posW[0] = r * Math.cos(theta);
                posW[1] = r * Math.sin(theta);
                break;
            case 'F':
                posS[0] += posW[0] * amt;
                posS[1] += posW[1] * amt;
                break;
        }
    });
    return +(Math.abs(posS[0]) + Math.abs(posS[1])).toFixed(7);
}

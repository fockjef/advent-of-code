/* --- Day 8: Two-Factor Authentication --- */

function silver() {
    return displayScreen().flat().filter(Boolean).length;
}

function gold() {
    let screen = displayScreen();
    let code = '';
    for (let i = 0; i < screen[0].length; i += 5) {
        code += identifyLetter(screen.map(row => row.slice(i, i + 5)));
    }
    return code;
}

function displayScreen() {
    let screen = Array.from(new Array(6), () => new Array(50).fill(0));
    parseInput(x => x.match(/rect|row|col|\d+/g)).forEach(instr => {
        switch (instr[0]) {
            case 'rect':
                let [, w, h] = instr;
                screen.slice(0, h).forEach(row => row.fill(1, 0, w));
                break;
            case 'row':
                let [, r, n1] = instr;
                n1 %= screen[0].length;
                screen[r] = screen[r]
                    .slice(-n1)
                    .concat(screen[r].slice(0, -n1));
                break;
            case 'col':
                let [, c, n2] = instr,
                    col = screen.map(row => row[c]);
                n2 %= screen[0].length;
                col = col.slice(-n2).concat(col.slice(0, -n2));
                screen.forEach((row, i) => (row[c] = col[i]));
                break;
        }
    });
    return screen;
}

const alphabet = {
    ciiuii: 'A',
    sisiis: 'B',
    ciggic: 'C',
    ugsggu: 'E',
    ugsggg: 'F',
    cigmie: 'G',
    iiuiii: 'H',
    '6222ic': 'J',
    ikokki: 'K',
    gggggu: 'L',
    ciiiic: 'O',
    siisgg: 'P',
    siiski: 'R',
    eggc2s: 'S',
    iiiiic: 'U',
    hha444: 'Y',
    u248gu: 'Z'
};

function identifyLetter(letter) {
    while (letter[0].length < 5) {
        letter.forEach(row => (row[row.length] = 0));
    }
    let id = letter.map(row => parseInt(row.join(''), 2).toString(32)).join('');
    return id in alphabet ? alphabet[id] : '?';
}

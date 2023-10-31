/* --- Day 2: Bathroom Security --- */

function silver(keypad = '......123..456..789......') {
    let width = Math.sqrt(keypad.length),
        pos = keypad.indexOf(5),
        code = '';
    parseInput().forEach(instr => {
        instr.split('').forEach(dir => {
            newPos = pos;
            switch (dir) {
                case 'U':
                    newPos -= width;
                    break;
                case 'D':
                    newPos += width;
                    break;
                case 'L':
                    newPos--;
                    break;
                case 'R':
                    newPos++;
                    break;
            }
            if (keypad.charAt(newPos) != '.') pos = newPos;
        });
        code += keypad.charAt(pos);
    });
    return code;
}

function gold() {
    return silver('..........1.....234...56789...ABC.....D..........');
}

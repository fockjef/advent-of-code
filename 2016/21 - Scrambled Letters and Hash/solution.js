/* --- Day 21: Scrambled Letters and Hash --- */

function silver(passwd = 'abcdefgh', reverse = false) {
    let ops = parseInput(x => x.split(' '));
    passwd = passwd.split('');

    if (reverse) ops.reverse();

    ops.forEach(op => {
        let idxA, idxB, rot;
        switch (op[0]) {
            case 'swap':
                if (op[1] == 'position') {
                    idxA = +op[2];
                    idxB = +op[5];
                } else {
                    idxA = passwd.indexOf(op[2]);
                    idxB = passwd.indexOf(op[5]);
                }
                [passwd[idxA], passwd[idxB]] = [passwd[idxB], passwd[idxA]];
                break;
            case 'rotate':
                if (op[1] == 'based') {
                    if (!reverse) {
                        rot = [-1, -2, -3, -4, -6, -7, 0, -1][
                            passwd.indexOf(op[6])
                        ];
                    } else {
                        rot = [-1, -1, -6, -2, -7, -3, 0, -4][
                            passwd.indexOf(op[6])
                        ];
                    }
                } else {
                    rot = +op[2];
                    if (op[1] == 'right') rot = -rot;
                }
                rot %= passwd.length;
                if (reverse) rot = -rot;
                passwd.unshift(...passwd.splice(rot));
                break;
            case 'reverse':
                idxA = +op[2];
                idxB = +op[4] + 1;
                passwd.splice(
                    idxA,
                    idxB - idxA,
                    ...passwd.slice(idxA, idxB).reverse()
                );
                break;
            case 'move':
                idxA = +op[2];
                idxB = +op[5];
                if (reverse) [idxA, idxB] = [idxB, idxA];
                passwd.splice(idxB, 0, ...passwd.splice(idxA, 1));
                break;
        }
    });

    return passwd.join('');
}

function gold() {
    return silver('fbgdceah', true);
}

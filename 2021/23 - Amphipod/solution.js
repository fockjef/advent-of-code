/* --- Day 23: Amphipod --- */

function silver() {
    let data = parseInput(x => x.split('')),
        board = data.slice(1, -1).map(row => row.slice(1, -1));
    Object.values(amphipods).forEach(a => (board[0][a.roomIdx] = ':'));
    return organizeAmphipods(board, {});
}

function gold() {
    let data = parseInput(x => x.split('')),
        board = data.slice(1, -1).map(row => row.slice(1, -1));
    Object.values(amphipods).forEach(a => (board[0][a.roomIdx] = ':'));
    board.splice(2, 0, ' #D#C#B#A#'.split(''), ' #D#B#A#C#'.split(''));
    return organizeAmphipods(board, {});
}

const amphipods = {
    A: {roomIdx: 2, moveCost: 1},
    B: {roomIdx: 4, moveCost: 10},
    C: {roomIdx: 6, moveCost: 100},
    D: {roomIdx: 8, moveCost: 1000}
};

const reAmphipod = new RegExp('[' + Object.keys(amphipods).join('') + ']');

function organizeAmphipods(board, cache) {
    let key = board.map(row => row.join('')).join('');
    if (key in cache) return cache[key];
    let moves = findValidMoves(board);
    if (moves.length == 0) {
        if (board.some(row => row.some(col => reAmphipod.test(col)))) {
            return Infinity;
        } else {
            return 0;
        }
    }
    return (cache[key] = Math.min(
        ...moves.map(({from, to}) => {
            let dist = Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]),
                b = board.map(row => row.slice()),
                amphi = b[from[0]][from[1]];
            b[from[0]][from[1]] = '.';
            b[to[0]][to[1]] = to[0] == 0 ? amphi : amphi.toLowerCase();
            let cost =
                amphipods[amphi].moveCost * dist + organizeAmphipods(b, cache);
            return cost;
        })
    ));
}

function findValidMoves(board) {
    let moves = [];
    // check rooms
    for (let room = 1; room <= 4; room++) {
        for (let slot = 1; slot < board.length; slot++) {
            if (reAmphipod.test(board[slot][room * 2])) {
                // look left
                for (i = room * 2 - 1; i >= 0; i--) {
                    if (board[0][i] != ':') {
                        if (board[0][i] == '.') {
                            moves.push({
                                from: [slot, room * 2],
                                to: [0, i]
                            });
                        } else {
                            i = -Infinity;
                        }
                    }
                }
                // look right
                for (i = room * 2 + 1; i < board[0].length; i++) {
                    if (board[0][i] != ':') {
                        if (board[0][i] == '.') {
                            moves.push({
                                from: [slot, room * 2],
                                to: [0, i]
                            });
                        } else {
                            i = Infinity;
                        }
                    }
                }
                slot = Infinity;
            }
        }
    }
    // check hallway
    for (let i = 0; i < board[0].length; i++) {
        if (reAmphipod.test(board[0][i])) {
            let amphi = board[0][i],
                rIdx = amphipods[amphi].roomIdx;
            if (board.slice(1).every(row => !reAmphipod.test(row[rIdx]))) {
                if (
                    (i < rIdx &&
                        board[0]
                            .slice(i + 1, rIdx)
                            .every(col => !reAmphipod.test(col))) ||
                    (i > rIdx &&
                        board[0]
                            .slice(rIdx + 1, i)
                            .every(col => !reAmphipod.test(col)))
                ) {
                    moves.push({
                        from: [0, i],
                        to: [board.map(row => row[rIdx]).lastIndexOf('.'), rIdx]
                    });
                }
            }
        }
    }
    return moves;
}

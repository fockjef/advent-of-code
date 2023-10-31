/* --- Day 6: Signals and Noise --- */

function silver(idx = 0) {
    let freq = new Array();
    parseInput().forEach(msg =>
        msg.split('').forEach((c, i) => {
            if (!freq[i]) freq[i] = {};
            if (!freq[i][c]) freq[i][c] = 0;
            freq[i][c]++;
        })
    );
    return freq
        .map(
            f =>
                Object.entries(f)
                    .sort((a, b) => b[1] - a[1])
                    .slice(idx)[0][0]
        )
        .join('');
}

function gold() {
    return silver(-1);
}

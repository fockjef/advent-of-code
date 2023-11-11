/* --- Day 15: Timing is Everything --- */

function silver(extra_discs = []) {
    let discs = parseInput(x =>
        x
            .match(
                /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./
            )
            .slice(1)
            .map(Number)
    )
        .map(([d, n, p]) => ({a: (((n - p - d) % n) + n) % n, n: n}))
        .sort((a, b) => b.n - a.n);
    extra_discs.forEach(({n, p}, i) =>
        discs.push({a: (((n - p - (discs.length + 1 + i)) % n) + n) % n, n: n})
    );
    for (let i = 0; i < discs.length - 1; i++) {
        let {
                gcd,
                bezout: {s, t}
            } = extended_gcd(discs[i].n, discs[i + 1].n),
            n = discs[i].n * discs[i + 1].n;
        if (gcd != 1)
            throw new Error(
                `${discs[i].n} and ${discs[i + 1].n} are not coprime`
            );
        discs[i + 1] = {
            a:
                (((discs[i].a * t * discs[i + 1].n +
                    discs[i + 1].a * s * discs[i].n) %
                    n) +
                    n) %
                n,
            n: n
        };
    }
    return discs[discs.length - 1].a;
}

function gold() {
    return silver([{n: 11, p: 0}]);
}

function extended_gcd(a, b) {
    let r = [a, b],
        s = [1, 0],
        t = [0, 1],
        q;
    while (r[1] != 0) {
        q = (r[0] / r[1]) >>> 0;
        r = [r[1], r[0] - q * r[1]];
        s = [s[1], s[0] - q * s[1]];
        t = [t[1], t[0] - q * t[1]];
    }
    return {
        gcd: r[0],
        bezout: {
            s: s[0],
            t: t[0]
        }
    };
}

/* --- Day 7: Internet Protocol Version 7 --- */

function silver() {
    return parseInput().filter(supportsTLS).length;
}

function gold() {
    return parseInput().filter(supportsSSL).length;
}

function supportsTLS(ip) {
    const ABBA = /([a-z])(?!\1)([a-z])\2\1/;
    return (
        ip.match(/\[[^\]]+\]/g).every(seq => !ABBA.test(seq)) && ABBA.test(ip)
    );
}

function supportsSSL(ip) {
    const BAB = /(?=(([a-z])(?!\2)[a-z]\2))/g;
    ABA = [];
    ip = ip.replace(
        /(?<=\[)[^\]]+(?=\])/g,
        seq =>
            [...seq.matchAll(BAB)].map(m =>
                ABA.push(m[1][1] + m[1][0] + m[1][1])
            ).length
    );
    return ABA.some(seq => ip.includes(seq));
}

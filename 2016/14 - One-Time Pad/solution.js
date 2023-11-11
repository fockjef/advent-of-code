/* --- Day 14: One-Time Pad --- */

function silver(iter = 0) {
    let salt = parseInput()[0],
        cache = {},
        keys = [],
        tripletRE = /(.)\1\1/;
    for (let i = 0; i < Infinity; i++) {
        let key = salt + i,
            h = (cache[key] = cache[key] || keygen(key, iter));
        if (tripletRE.test(h)) {
            let quintet = h.match(tripletRE)[1].repeat(5);
            for (let j = 1; j <= 1000; j++) {
                let key = salt + (i + j),
                    h = (cache[key] = cache[key] || keygen(key, iter));
                if (h.includes(quintet)) {
                    keys.push(i);
                    break;
                }
            }
        }
        if (keys.length == 64) break;
    }
    return keys[keys.length - 1];
}

function gold() {
    return silver(2016);
}

function keygen(key, iter = 0) {
    for (let i = 0; i <= iter; i++) {
        key = md5(key);
    }
    return key;
}

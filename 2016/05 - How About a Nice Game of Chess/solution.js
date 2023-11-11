/* --- Day 5: How About a Nice Game of Chess? --- */

const hashCache = {};

function silver() {
    let secret = parseInput()[0],
        prefix = '00000',
        passwd = '';
    for (let i = 0; passwd.length < 8; i++) {
        let hash = md5(secret + i);
        if (hash.slice(0, prefix.length) == prefix) {
            hashCache[i] = hash;
            passwd += hash.charAt(prefix.length);
        }
    }
    return passwd;
}

function gold() {
    let secret = parseInput()[0],
        prefix = '00000',
        passwd = new Array(8);

    Object.keys(hashCache)
        .numericSortAsc()
        .forEach(idx => {
            let pos = parseInt(hashCache[idx].charAt(prefix.length), 16);
            if (pos < passwd.length && passwd[pos] == undefined) {
                passwd[pos] = hashCache[idx].charAt(prefix.length + 1);
                if (passwd.join('').length == passwd.length) return passwd;
            }
        });

    for (let i = [-1, ...Object.keys(hashCache)].max() + 1; true; i++) {
        let hash = md5(secret + i);
        if (hash.slice(0, prefix.length) == prefix) {
            let pos = parseInt(hash.charAt(prefix.length), 16);
            if (pos < passwd.length && passwd[pos] == undefined) {
                passwd[pos] = hash.charAt(prefix.length + 1);
                if (passwd.join('').length == passwd.length)
                    return passwd.join('');
            }
        }
    }
}

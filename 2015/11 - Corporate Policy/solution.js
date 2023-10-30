/* --- Day 11: Corporate Policy --- */

function silver(passwd = parseInput()[0]) {
    passwd = passwd.replace(
        /[ilo].*/,
        m => String.fromCharCode(m.charCodeAt(0) + 1) + 'a'.repeat(m.length - 1)
    );
    while (1) {
        passwd = number2Password(password2Number(passwd) + 1);
        if (isValidPassword(passwd)) return passwd;
    }
}

function gold() {
    return silver(silver());
}

const validChars = 'abcdefghjkmnpqrstuvwxyz',
    radix = validChars.length,
    isValidPassword = p =>
        /abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(p) &&
        /(.)\1/.test(p.replace(/(.)\1/, '!')),
    password2Number = p =>
        parseInt(
            p.replace(/./g, m => validChars.indexOf(m).toString(radix)),
            radix
        ),
    number2Password = n =>
        (
            'aaaaaaaa' +
            n.toString(radix).replace(/./g, m => validChars[parseInt(m, radix)])
        ).slice(-8);

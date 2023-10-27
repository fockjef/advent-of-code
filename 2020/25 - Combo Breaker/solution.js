/* --- Day 25: Combo Breaker --- */

function silver() {
    let base = 7,
        exponent = 0,
        modulus = 20201227,
        keys = parseInput(x => x % modulus),
        value = 1;
    while (value !== keys[0]) {
        value = (value * base) % modulus;
        exponent++;
    }
    base = keys[1];
    value = 1;
    while (exponent) {
        if (exponent % 2) value = (value * base) % modulus;
        exponent >>>= 1;
        base = (base * base) % modulus;
    }
    return value;
}

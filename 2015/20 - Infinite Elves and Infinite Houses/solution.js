/* --- Day 20: Infinite Elves and Infinite Houses --- */

function silver(factorFunc = factors.bind(null, Infinity), multiplier = 10) {
    let minPresents = parseInput(Number)[0] / multiplier;
    for (let i = 1; i < minPresents; i++) {
        let numPresents = factorFunc(i).sum();
        if (numPresents > minPresents) {
            return i;
        }
    }
}

function gold() {
    return silver(factors.bind(null, 50), 11);
}

function factors(cutoff, n) {
    let factors = n == 1 ? [1] : n <= cutoff ? [1, n] : [n];
    for (let i = Math.min(cutoff, Math.floor(Math.sqrt(n))); i > 1; i--) {
        if (n % i == 0) {
            let j = n / i;
            if (j > cutoff) {
                factors.push(j);
            } else {
                factors.push(i, j);
            }
        }
    }
    return [...new Set(factors)];
}

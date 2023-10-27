/* --- Day 5: Doesn't He Have Intern-Elves For This? --- */

function silver() {
    return parseInput().filter(
        x =>
            !/ab|cd|pq|xy/.test(x) &&
            /([aeiou].*){3}/.test(x) &&
            /([a-z])\1/.test(x)
    ).length;
}

function gold() {
    return parseInput().filter(
        x => /([a-z]{2}).*\1/.test(x) && /([a-z]).\1/.test(x)
    ).length;
}

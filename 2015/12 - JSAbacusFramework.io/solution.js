/* --- Day 12: JSAbacusFramework.io --- */

var silver = ignore => getValue(JSON.parse(parseInput()[0]), ignore);
var gold = () => silver('red');

function getValue(x, ignore) {
    switch (x.constructor) {
        case Number:
            return x;
        case String:
            return 0;
        case Array:
            return x.reduce((S, y) => S + getValue(y, ignore), 0);
        case Object:
            let values = Object.values(x);
            return ignore && values.includes(ignore)
                ? 0
                : values.reduce((S, y) => S + getValue(y, ignore), 0);
    }
}

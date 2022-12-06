/* --- Day 6: Tuning Trouble --- */

var silver = () => findSignal(4);
var gold = () => findSignal(14);

const findSignal = signalLen => parseInput()[0].split("").findIndex((c, i, A) => new Set(A.slice(i, i + signalLen)).size == signalLen) + signalLen;

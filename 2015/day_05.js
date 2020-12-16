/* --- Day 5: Doesn't He Have Intern-Elves For This? --- */

function day_05a(){
	return parseInput().filter( x => !/ab|cd|pq|xy/.test( x ) && /([aeiou].*){3}/.test( x ) && /([a-z])\1/.test( x ) ).length;
}

function day_05b(){
	return parseInput().filter( x => /([a-z]{2}).*\1/.test( x ) && /([a-z]).\1/.test( x ) ).length;
}

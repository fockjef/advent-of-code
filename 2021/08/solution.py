#!/usr/bin/python3
# --- Day 8: Seven Segment Search ---

import re

# read input as list of numbers
input = open( "input.txt")
data = [ re.findall( r"[a-g]+", x) for x in input.readlines() ]
input.close()

# helper functions
def extractPattern( filterFunc, patterns):
    d = list(filter( filterFunc, patterns))[0]
    patterns.remove(d)
    return set(d)

def decode(signalPatterns):
    patterns = signalPatterns[0:10]
    digits = [None] * 10
    digits[1] = extractPattern( lambda p: len(p) == 2, patterns)
    digits[7] = extractPattern( lambda p: len(p) == 3, patterns)
    digits[4] = extractPattern( lambda p: len(p) == 4, patterns)
    digits[8] = extractPattern( lambda p: len(p) == 7, patterns)
    digits[9] = extractPattern( lambda p: len(digits[4].intersection(p)) == 4, patterns)
    digits[0] = extractPattern( lambda p: len(p) == 6 and len(digits[7].intersection(p)) == 3, patterns)
    digits[6] = extractPattern( lambda p: len(p) == 6, patterns)
    digits[3] = extractPattern( lambda p: len(digits[7].intersection(p)) == 3, patterns)
    digits[5] = extractPattern( lambda p: len(digits[9].intersection(p)) == 5, patterns)
    digits[2] = set(patterns[0])
    outputs = signalPatterns[-4:]
    outputs = [ digits.index(p) for p in map( set, outputs)]
    return int( "".join( map( str, outputs)), 10)

# solutions
def silver():
    count = 0
    for pattern in data:
        for output in pattern[-4:]:
            if len(output) in [ 2, 3, 4, 7]:
                count += 1
    return count

def gold():
    return sum(map( decode, data))

#!/usr/bin/python3

import re

# read input as list of numbers
input = open( "day_08.input")
data = [ re.findall( r"[a-g]+", x) for x in input.readlines() ]
input.close()

# helper functions
def decode(signalPatterns):
    patterns = signalPatterns[0:10]
    outputs = signalPatterns[-4:]
    digits = [None] * 10
    # 1
    d = list(filter( lambda p: len(p) == 2, patterns))[0]
    patterns.remove(d)
    digits[1] = set(d)
    # 7
    d = list(filter( lambda p: len(p) == 3, patterns))[0]
    patterns.remove(d)
    digits[7] = set(d)
    # 4
    d = list(filter( lambda p: len(p) == 4, patterns))[0]
    patterns.remove(d)
    digits[4] = set(d)
    # 8
    d = list(filter( lambda p: len(p) == 7, patterns))[0]
    patterns.remove(d)
    digits[8] = set(d)
    # 9
    d = list(filter( lambda p: len(digits[4].intersection(p)) == 4, patterns))[0]
    patterns.remove(d)
    digits[9] = set(d)
    # 0
    d = list(filter( lambda p: len(p) == 6 and len(digits[7].intersection(p)) == 3, patterns))[0]
    patterns.remove(d)
    digits[0] = set(d)
    # 6
    d = list(filter( lambda p: len(p) == 6, patterns))[0]
    patterns.remove(d)
    digits[6] = set(d)
    # 3
    d = list(filter( lambda p: len(digits[7].intersection(p)) == 3, patterns))[0]
    patterns.remove(d)
    digits[3] = set(d)
    # 5
    d = list(filter( lambda p: len(digits[9].intersection(p)) == 5, patterns))[0]
    patterns.remove(d)
    digits[5] = set(d)
    # 2
    digits[2] = set(patterns[0])
    return int("".join([str(digits.index(set(p))) for p in outputs]))

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

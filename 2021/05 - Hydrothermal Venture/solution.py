#!/usr/bin/python3
# --- Day 5: Hydrothermal Venture ---

import re

# read input as list of coordinate pairs: x0, y0 -> x1, y1
input = open( "input.txt")
data = [ list(map( int, re.findall( r"\d+", x))) for x in input.readlines()]
input.close()

# helper functions
sign = lambda n: -1 if n < 0 else 1 if n > 0 else 0

def countOverlaps(vents):
    xMin = float("inf")
    xMax = -xMin
    yMin = xMin
    yMax = xMax
    for x0, y0, x1, y1 in vents:
        xMin = min( xMin, x0, x1)
        xMax = max( xMax, x0, x1)
        yMin = min( yMin, y0, y1)
        yMax = max( yMax, y0, y1)
    seafloor = [ [0] * (xMax - xMin + 1) for row in range(yMax - yMin + 1)]
    count = 0
    for x0, y0, x1, y1 in vents:
        xInc = sign(x1 - x0)
        yInc = sign(y1 - y0)
        while (x1 - x0) * xInc >= 0 and (y1 - y0) * yInc >= 0:
            if seafloor[y0 - yMin][x0 - xMin] == 1:
                count += 1
            seafloor[y0 - yMin][x0 - xMin] += 1
            x0 += xInc
            y0 += yInc
    return count

# solutions
def silver():
    vents = list(filter( lambda coords: coords[0] == coords[2] or coords[1] == coords[3], data))
    return countOverlaps(vents)

def gold():
    vents = data
    return countOverlaps(vents)

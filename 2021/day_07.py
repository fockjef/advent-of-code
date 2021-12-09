#!/usr/bin/python3

# read input as list integers seperated by ","
input = open( "day_07.input")
data = [ int(x) for x in input.readline().split(",")]
input.close()

# helper functions

# solutions
def silver():
    data.sort()
    posAlign = data[(len(data) - 1) // 2]
    fuelCost = lambda pos: abs(pos - posAlign) 
    return sum(map( fuelCost, data));

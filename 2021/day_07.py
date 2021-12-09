#!/usr/bin/python3

import math

# read input as list integers seperated by ","
input = open( "day_07.input")
data = [ int(x) for x in input.readline().split(",")]
input.close()

# solutions
def silver():
    data.sort()
    median = data[(len(data) - 1) // 2]
    fuelCost = lambda pos: abs(pos - median) 
    return sum(map( fuelCost, data))

def gold():
    mean = sum(data) / len(data)
    if not mean.is_integer():
        data.sort()
        median = data[(len(data) - 1) // 2]
        if mean < median:
            mean = math.ceil(mean)
        else:
            if len(data) % 2 == 0 and mean < data[len(data) // 2]:
                mean = round(mean)
            else:
                mean = math.floor(mean)
    fuelCost = lambda pos: abs(pos - mean) * (abs(pos - mean) + 1) // 2
    return sum(map( fuelCost, data))
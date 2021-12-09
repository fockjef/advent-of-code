#!/usr/bin/python3

# read input as list integers seperated by ","
input = open( "day_06.input")
data = [ int(x) for x in input.readline().split(",")]
input.close()

# helper functions
def numFish( fish, numDays):
    for day in range(numDays):
        fish[(day + 7) % len(fish)] += fish[day % len(fish)];
    return sum(fish);

# solutions
def silver( numDays = 80):
    fish = [0] * 9
    for n in data:
        fish[n] += 1
    return numFish( fish, numDays)

def gold():
    return silver(256)

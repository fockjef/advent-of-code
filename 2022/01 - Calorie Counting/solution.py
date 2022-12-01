#!/usr/bin/python3
# --- Day 1: Calorie Counting ---

input = open("input.txt")
data = [ x.strip() for x in input.readlines() ]
input.close()

def countCalories(n):
    elves = [0]
    for val in data:
        if val.isnumeric():
            elves[0] = elves[0] + int(val)
        else:
            elves.insert(0,0)
    elves.sort()
    return sum(elves[-n:])

silver = lambda: countCalories(1)
gold = lambda: countCalories(3)

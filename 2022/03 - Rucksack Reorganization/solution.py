#!/usr/bin/python3
# --- Day 3: Rucksack Reorginization ---

with open("input.txt") as input:
    data = [ x.strip() for x in input.readlines() ]

def priority(chr):
    return (ord(chr) - 38) % 58

def silver():
    total = 0
    for sack in data:
        compartment1 = sack[:len(sack)//2]
        compartment2 = sack[len(sack)//2:]
        for item in compartment1:
            if item in compartment2:
                total = total + priority(item)
                break
    return total

def gold():
    total = 0
    for i in range(0, len(data), 3):
        sack1, sack2, sack3 = data[i:i+3]
        for item in sack1:
            if item in sack2 and item in sack3:
                total = total + priority(item)
                break
    return total

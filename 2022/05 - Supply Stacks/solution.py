#!/usr/bin/python3
# --- Day 5: Supply Stacks ---

import re

with open("input.txt") as input:
    data = input.read().strip()

def initializeStacks(stackDescription):
    return list(map(
        lambda s: list(filter(lambda item: item.isalpha(), s)),
        list(zip(*reversed(stackDescription.splitlines())))[1::4]
    ))

def moveCargo(craneType = 9000):
    stackDescription, instructions = data.split("\n\n", 1)
    stacks = initializeStacks(stackDescription)
    for instr in instructions.splitlines():
        count, fromStack, toStack = [int(n) for n in re.findall(r'\d+', instr)]
        cargo = stacks[fromStack-1][-count:]
        stacks[fromStack-1] = stacks[fromStack-1][:-count]
        if craneType == 9000:
            cargo.reverse()
        stacks[toStack-1].extend(cargo)
    return "".join([s[-1] for s in stacks])

silver = lambda: moveCargo(craneType = 9000)
gold = lambda: moveCargo(craneType = 9001)

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

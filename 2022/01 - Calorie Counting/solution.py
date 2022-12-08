#!/usr/bin/python3
# --- Day 1: Calorie Counting ---

with open("input.txt") as input:
    data = input.read().strip()

def countCalories(n):
    return sum(
        sorted(
            [sum(map(int, elf.split("\n"))) for elf in data.split("\n\n")],
            reverse = True
        )[0:n]
    )

silver = lambda: countCalories(1)
gold = lambda: countCalories(3)

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

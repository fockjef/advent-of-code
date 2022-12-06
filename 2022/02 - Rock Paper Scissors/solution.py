#!/usr/bin/python3
# --- Day 2: Rock Paper Scissors ---

with open("input.txt") as input:
    data = [ x.strip() for x in input.readlines() ]

def calcScore(strategy):
    score = 0
    for round in data:
        score = score + strategy[round]
    return score

silver = lambda: calcScore({"A X": 4, "A Y": 8, "A Z": 3, "B X": 1, "B Y": 5, "B Z": 9, "C X": 7, "C Y": 2, "C Z": 6})
gold = lambda: calcScore({"A X": 3, "A Y": 4, "A Z": 8, "B X": 1, "B Y": 5, "B Z": 9, "C X": 2, "C Y": 6, "C Z": 7})

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

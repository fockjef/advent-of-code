#!/usr/bin/python3
# --- Day 2: Rock Paper Scissors ---

with open("input.txt") as input:
    data = [ x.strip() for x in input.readlines() ]

strategy = {
    "silver": {"A X": 4, "A Y": 8, "A Z": 3, "B X": 1, "B Y": 5, "B Z": 9, "C X": 7, "C Y": 2, "C Z": 6},
    "gold":   {"A X": 3, "A Y": 4, "A Z": 8, "B X": 1, "B Y": 5, "B Z": 9, "C X": 2, "C Y": 6, "C Z": 7},
}

def calcScore(strategyId):
    score = 0
    for round in data:
        score = score + strategy[strategyId][round]
    return score

silver = lambda: calcScore("silver")
gold = lambda: calcScore("gold")

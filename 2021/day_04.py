#!/usr/bin/python3

# read input as list of numbers
input = open( "day_04.input")
data = input.read().split("\n\n")
input.close()

# helper functions

def parseBingoCard(card):
	rows = card.split("\n")
	for i, r in enumerate(rows):
		rows[i] = [ int(c) for c in r.split()]
	return rows

def markCard( card, n):
	for row in card:
		try:
			col = row.index(n)
			row[col] = -1
			return True
		except ValueError:
			pass
	return False

def isWinner(card):
	for row in card:
		if row.count(-1) == 5:
			return True
	for col, val in enumerate(card[0]):
		if val == -1:
			isWinner = True
			for row in card[1:]:
				if row[col] != -1:
					isWinner = False
			if isWinner:
				return True
	return False

def cardValue(card):
	value = 0
	for row in card:
		for val in row:
			if val != -1:
				value += val
	return value

# solutions
def silver():
	randNums = [ int(x) for x in data[0].split(",")]
	bingoCards = [ parseBingoCard(x) for x in data[1:]]
	for n in randNums:
		for card in bingoCards:
			if markCard( card, n):
				if isWinner(card):
					return n * cardValue(card)

def gold():
	randNums = [ int(x) for x in data[0].split(",")]
	bingoCards = [ parseBingoCard(x) for x in data[1:]]
	for n in randNums:
		winningCards = []
		for card in bingoCards:
			if markCard( card, n):
				if isWinner(card):
					winningCards.append(card)
		if len(winningCards) == len(bingoCards):
			return n * cardValue(winningCards[-1])
		for card in winningCards:
			bingoCards.remove(card)

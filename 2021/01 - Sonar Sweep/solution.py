#!/usr/bin/python3
# --- Day 1: Sonar Sweep ---

# read input as list of numbers
input = open( "input.txt")
data = [ int(x) for x in input.readlines() ]
input.close()

# helper functions
def compareWindows(size):
	count = 0
	for i in range( size, len(data)):
		if data[i] > data[i-size]:
			count += 1
	return count

# solutions
silver = lambda: compareWindows(1)
gold = lambda: compareWindows(3)
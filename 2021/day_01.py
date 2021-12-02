#!/usr/bin/python3

# read input as list of numbers
input = open( "day_01.input")
data = [ float(x) for x in input.readlines() ]
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

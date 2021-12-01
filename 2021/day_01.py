#!/usr/bin/python3

def compareWindows( size):
	count = 0
	for i in range( size, len(data)):
		if data[i] > data[i-size]:
			count += 1
	return count

def day_01a():
	return compareWindows(1)

def day_01b():
	return compareWindows(3)

input = open("day_01.input")
data = [ float(x) for x in input.readlines() ]
input.close()

print( "day 01(a): ", day_01a())
print( "day 01(b): ", day_01b())

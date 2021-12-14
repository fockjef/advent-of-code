#!/usr/bin/python3
# --- Day 2: Dive! ---

# read input as list of commands "{{cmd}} {{X}}"
input = open( "input.txt")
data = [ x.split(" ") for x in input.readlines() ]
input.close()

# solutions
def silver():
	depth = 0
	hpos = 0
	for cmd, X in data:
		if cmd == "up":
			depth -= int(X)
		elif cmd == "down":
			depth += int(X)
		else:
			hpos  += int(X)
	return depth * hpos

def gold():
	aim = 0
	depth = 0
	hpos = 0
	for cmd, X in data:
		if cmd == "up":
			aim -= int(X)
		elif cmd == "down":
			aim += int(X)
		else:
			hpos += int(X)
			depth += int(X) * aim
	return depth * hpos

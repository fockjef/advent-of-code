#!/usr/bin/python3
# --- Day 9: Rope Bridge ---

with open("input.txt") as input:
    data = [x.rstrip() for x in input.readlines()]

def sign(x):
    if x == 0:
        return 0
    return 1 if x > 0 else -1

def simulateRope(numKnots):
    knots = [{"x": 0, "y": 0} for n in range(numKnots)]
    visited = set([str(knots[-1])])
    for move in data:
        dir, dist = move.split(" ")
        incX = {"R": 1, "L": -1}.get(dir, 0)
        incY = {"U": 1, "D": -1}.get(dir, 0)
        for i in range(int(dist)):
            knots[0]["x"] = knots[0]["x"] + incX
            knots[0]["y"] = knots[0]["y"] + incY
            for k in range(1, numKnots):
                dX = knots[k-1]["x"] - knots[k]["x"]
                dY = knots[k-1]["y"] - knots[k]["y"]
                if abs(dX) < 2 and abs(dY) < 2:
                    break
                knots[k]["x"] = knots[k]["x"] + sign(dX)
                knots[k]["y"] = knots[k]["y"] + sign(dY)
            visited.add(str(knots[-1]))
    return len(visited)

silver = lambda: simulateRope(numKnots = 2)
gold = lambda: simulateRope(numKnots = 10)

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

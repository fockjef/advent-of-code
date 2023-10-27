#!/usr/bin/python3
# --- Day 4: Camp Cleanup ---

with open("input.txt") as input:
    data = [ x.strip() for x in input.readlines() ]

def countOverlap(method):
    count = 0
    for assignment in data:
        range1, range2 = assignment.split(",")
        lo1, hi1 = map( int, range1.split("-"))
        lo2, hi2 = map( int, range2.split("-"))
        match method:
                case "superset":
                    if (lo1 <= lo2 and hi1 >= hi2) or (lo2 <= lo1 and hi2 >= hi1):
                        count = count + 1
                case "intersect":
                    if lo1 <= hi2 and hi1 >= lo2:
                        count = count + 1
    return count

silver = lambda: countOverlap("superset")
gold = lambda: countOverlap("intersect")

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

#!/usr/bin/python3

import importlib, os, sys;

year = sys.argv[1]
day = int(sys.argv[2])
dayDir = list(filter( lambda x: int(x[0:2]) == day, os.listdir(year)))[0]

os.chdir( "%s/%s" % ( year, dayDir))
solution = importlib.import_module( ".solution", package = "%s.%s" % ( year, dayDir))
expected = {}
if os.path.exists("expected.txt"):
    file = open("expected.txt")
    expected = dict( zip( [ "silver", "gold"], [ x.strip() for x in file.readlines()]))

def green(text):
    return "\x1b[38;5;2m%s\x1b[0m" % text

def red(text):
    return "\x1b[38;5;1m%s\x1b[0m" % text

print( "AoC %s day %d" % ( year, day))
if hasattr( solution, "silver"):
    result = str(solution.silver())
    status = " "
    if "silver" in expected:
        status = green("✓") if result == expected["silver"] else red("✗")
    print( "silver: %s %s" % ( status, result))
if hasattr( solution, "gold"):
    result = str(solution.gold())
    status = " "
    if "gold" in expected:
        status = green("✓") if result == expected["gold"] else red("✗")
    print( "gold  : %s %s" % ( status, result))


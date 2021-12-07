#!/usr/bin/python3

import importlib, os, sys;

year = sys.argv[1]
day = int(sys.argv[2])

os.chdir(year)
solution = importlib.import_module( ".day_%02d" % day, package = year)

print( "AoC %s day %02d" % ( year, day))
if hasattr( solution, "silver"):
    print( "silver: ", solution.silver())
if hasattr( solution, "gold"):
    print( "gold:   ", solution.gold())
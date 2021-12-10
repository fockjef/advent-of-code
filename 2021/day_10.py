#!/usr/bin/python3

import re
import statistics

# read input as list of binary strings
input = open( "day_10.input")
data = [ x.strip() for x in input.readlines() ]
input.close()

# helper functions
def checkSyntax(chunks):
    tagPairs = re.compile("\(\)|\[]|\{}|<>")
    tagClose = re.compile("([)}\]>])")
    while True:
        chunks, subs = tagPairs.sub( "", chunks)
        if subs == 0:
            break;
    if len(chunks) == 0:
        return { "isValid": True }
    elif tagClose.search(chunks) == None:
        return {
            "isValid": False,
            "error": {
                "incomplete": chunks,
                "corrupt": False
            }
        }
    else:
        incomplete, corruptTag = tagPairs.split( r"([)}\]>].*)", chunks)[0:2]
        return {
            "isValid": False,
            "error": {
                "incomplete": incomplete,
                "corrupt": corruptTag
            }
        }

def isCorrupt(status):
    return status.isValid == False and status.error.corrupt != False

def isIncomplete(status):
    return status.isValid == False and status.error.corrupt == False

def scoreCorrupt(status):
    score = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    }
    return score[status.error.corrupt]

def scoreIncomplete(status):
    score = {
        "(": "1",
        "[": "2",
        "{": "3",
        "<": "4"
    }
    return int( "".join( map( lambda t: score[t], reversed(status.error.incomplete))), 5)

# solutions
def silver():
    return sum( map( scoreCorrupt, filter( isCorrupt, map( checkSyntax, data))))

def gold():
    return statistics.median( map( scoreIncomplete, filter( isIncomplete, map( checkSyntax, data))))

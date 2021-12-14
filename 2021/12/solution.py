#!/usr/bin/python3
# --- Day 12: Passage Pathing ---

# read input as list of binary strings
input = open( "input.txt")
data = [ x.strip().split("-") for x in input.readlines() ]
input.close()

# helper functions
def pathValidator1( nextNode, path):
    return nextNode.isupper() or nextNode not in path

def pathValidator2( nextNode, path):
    if pathValidator1( nextNode, path):
        return True
    smallCaves = list(filter( str.islower, path))
    return len(smallCaves) == len(set(smallCaves))

def countPaths( path, nodes, pathValidator):
    currentNode = path[0]
    if currentNode == "end":
        return 1
    numPaths = 0
    for nextNode in nodes[currentNode]:
        if pathValidator( nextNode, path):
            numPaths += countPaths( [ nextNode, *path], nodes, pathValidator)
    return numPaths

# solutions
def silver( pathValidator = pathValidator1):
    nodes = {}
    for n1, n2 in data:
        if n2 != "start": nodes.setdefault( n1 , []).append(n2)
        if n1 != "start": nodes.setdefault( n2 , []).append(n1)
    return countPaths( ["start"], nodes, pathValidator)

def gold():
    return silver(pathValidator2)

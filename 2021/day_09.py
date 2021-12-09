#!/usr/bin/python3

# read input as 2d list of numbers
input = open( "day_09.input")
data = [ list(map( int, x.strip())) for x in input.readlines() ]
input.close()

# helper functions
neighborhood = [
    [ -1,  0], # U
    [  1,  0], # D
    [  0, -1], # L
    [  0,  1]  # R
]

def getNeighbors( row, col, grid):
    maxRow = len(grid)
    maxCol = len(grid[0])
    neigh = []
    for r, c in neighborhood:
        r += row
        c += col
        if r >= 0 and c >= 0 and r < maxRow and c < maxCol:
            neigh.append({
                "val": grid[r][c],
                "row": r,
                "col": c
            })
    return neigh

def getBasinSize( row, col, heightmap):
    heightmap[row][col] = 9
    queue = [[ row, col]]
    size = 1
    for r, c in queue:
        neigh = getNeighbors( r, c, heightmap)
        for n in neigh:
            if n["val"] != 9:
                heightmap[n["row"]][n["col"]] = 9
                queue.append([ n["row"], n["col"]])
                size += 1
    return size

# solutions
def silver():
    heightmap = list(filter( lambda row: len(row) > 0, data))
    lowPoints = 0
    for r, row in enumerate(heightmap):
        for c, val in enumerate(row):
            neigh = getNeighbors( r, c, heightmap)
            if len(list(filter( lambda n: n["val"] <= val, neigh))) == 0:
                lowPoints += val + 1
    return lowPoints

def gold():
    heightmap = list(filter( lambda row: len(row) > 0, data))
    basins = []
    for r, row in enumerate(heightmap):
        for c, val in enumerate(row):
            if val != 9:
                basins.append(getBasinSize( r, c, heightmap))
    basins.sort()
    basins.reverse()
    return basins[0] * basins[1] * basins[2]

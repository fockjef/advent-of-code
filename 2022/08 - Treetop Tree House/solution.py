#!/usr/bin/python3
# --- Day 8: Treetop Tree House ---

with open("input.txt") as input:
    data = [x.rstrip() for x in input.readlines()]

grid = [list(map(int, row)) for row in data]
gridInv = list(zip(*grid))

isVisible = lambda tree, forest: all(map(lambda t: t < tree, forest))
treesSeen = lambda tree, forest: list(map(lambda t: t < tree, [*list(forest)[0:-1], tree])).index(False) + 1

def silver():
    numVisible = (len(grid) + len(grid[0]) - 2) * 2
    for r in range(1, len(grid) - 1):
        for c in  range(1, len(grid[r]) - 1):
            if ( isVisible(grid[r][c], grid   [r][0  :c]) # left
              or isVisible(grid[r][c], grid   [r][c+1: ]) # right
              or isVisible(grid[r][c], gridInv[c][0  :r]) # up
              or isVisible(grid[r][c], gridInv[c][r+1: ]) # down
            ):
                numVisible = numVisible + 1
    return numVisible

def gold():
    highScore = -1
    for r in range(1, len(grid) - 1):
        for c in  range(1, len(grid[r]) - 1):
            score = ( treesSeen(grid[r][c], reversed(grid   [r][0  :c]))
                    * treesSeen(grid[r][c], grid   [r][c+1: ])
                    * treesSeen(grid[r][c], reversed(gridInv[c][0  :r]))
                    * treesSeen(grid[r][c], gridInv[c][r+1: ])
            )
            if score > highScore:
                highScore = score
    return highScore

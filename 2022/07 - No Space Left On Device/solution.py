#!/usr/bin/python3
# --- Day 7: No Space Left On Device ---

with open("input.txt") as input:
    data = [x.rstrip() for x in input.readlines()]

fileSystem = {}
cwd = []
for line in data:
    match line[0:3]:
        case "$ l" | "dir":
            pass
        case "$ c":
            if line[5:7] == "..":
                cwd.pop()
            elif line[5] == "/":
                cwd = line[5:].split("/")
            else:
                cwd.append(line[5:])
        case _:
            size = int(line.split()[0])
            for i in range(2, len(cwd) + 1):
                path = "/".join(cwd[1:i])
                fileSystem[path] = fileSystem.get(path, 0) + size

silver = lambda: sum(filter(lambda size: size <= 100_000, fileSystem.values()))
gold = lambda: min(filter(lambda size: size >= fileSystem[""] - 40_000_000, fileSystem.values()))

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

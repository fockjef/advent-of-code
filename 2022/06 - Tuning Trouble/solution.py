#!/usr/bin/python3
# --- Day 6: Tuning Trouble ---

with open("input.txt") as input:
    data = input.read().strip()

def findSignal(signalLen):
    for i in range(len(data)):
        if len(set(data[i:i+signalLen])) == signalLen:
            return i + signalLen
    return -1

silver = lambda: findSignal(4)
gold = lambda: findSignal(14)

if __name__ == "__main__":
    print("silver: %s" % silver())
    print("gold:   %s" % gold())

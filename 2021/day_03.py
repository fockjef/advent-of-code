#!/usr/bin/python3

# read input as list of binary strings
input = open( "day_03.input")
data = [ x.strip() for x in input.readlines() ]
input.close()

# helper functions
def filter_values( data, preferBit, bitIdx = 0):
    # return desired value, parsed as an integer
    if len(data) <= 1:
        return int( data[0], 2)
    # count number of set bits at position {bitIdx}
    cnt = 0
    for x in data:
        cnt += int(x[bitIdx])
    # determine bit value to filter data on
    filterBit = str(preferBit)
    if cnt < len(data) / 2:
        filterBit = str(preferBit ^ 1)
    # filter data to only include values with bit at position {bitIdx} equal to {filterBit}
    data = filter( lambda x: x[bitIdx] == filterBit, data)
    # continue to filter values recursively
    return filter_values( list(data), preferBit, bitIdx + 1)


# solutions
def silver():
    # count number of set bits at each position
    cnt = [0] * len(data[0])
    for x in data:
        for i, bit in enumerate(x):
            cnt[i] += int(bit)
    # find most common bit value at each position
    gamma = [ "1" if c > len(data) / 2 else "0" for c in  cnt ]
    # convert gamma bitstring to an int
    gamma = int( "".join(gamma), 2)
    # note that epsilon is the binary inverse of gamma
    # calculate inverse by subtracting gamma from 2**(#ofbits) - 1
    return gamma * (2**len(cnt) - 1 - gamma)

def gold():
    oxygen_generator_rating = filter_values( data, 1)
    co2_scrubber_rating = filter_values( data, 0)
    return oxygen_generator_rating * co2_scrubber_rating

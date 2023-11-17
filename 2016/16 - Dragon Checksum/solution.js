/* --- Day 16: Dragon Checksum --- */

function silver(disk_size = 272) {
    let data = parseInput()[0].split('').map(Number),
        blockSize = 1;

    while (disk_size % blockSize == 0) {
        blockSize *= 2;
    }
    blockSize /= 2;
    blockSize = Math.min(blockSize, 4096);

    let csum = new Array(disk_size / blockSize),
        disk = dd(data, blockSize);
    for (let i = 0; i < csum.length; i++) {
        csum[i] = checksum(disk.next().value);
    }

    return checksum(csum);
}

function gold() {
    return silver(35651584);
}

function checksum(data) {
    let csum = data.slice();
    while (csum.length % 2 == 0) {
        for (let i = 0; i < csum.length; i += 2) {
            csum[i >>> 1] = +(csum[i] == csum[i + 1]);
        }
        csum = csum.slice(0, csum.length / 2);
    }
    return csum.join('');
}

function* dd(seed, blockSize) {
    let buffer = new Uint8Array(blockSize + seed.length + 1),
        bufferIdx = 0,
        dC = dragonCurve(),
        seeds = [
            new Uint8Array(seed),
            new Uint8Array(seed).map(x => x ^ 1).reverse()
        ],
        seedIdx = 0;
    while (1) {
        while (bufferIdx < blockSize) {
            for (let i = 0; i < seed.length; i++) {
                buffer[bufferIdx + i] = seeds[seedIdx][i];
            }
            seedIdx ^= 1;
            bufferIdx += seed.length;
            buffer[bufferIdx++] = dC.next().value;
        }
        yield buffer.subarray(0, blockSize);
        buffer.copyWithin(0, blockSize, bufferIdx);
        bufferIdx -= blockSize;
    }
}

function* dragonCurve() {
    let count = 0,
        folds = [1],
        states = [0];
    while (1) {
        count++;
        for (let i = 0; i < states.length; i++) {
            if (count % folds[i] == 0) {
                yield states[i];
                states[i] ^= 1;
                if (i == 0) {
                    folds.unshift(folds[0] * 2);
                    states.unshift(0);
                }
                break;
            }
        }
    }
}

/* --- Day 9: Encoding Error --- */

function silver() {
    let data = parseInput(Number),
        preambleSz = 25;
    for (let i = preambleSz; i < data.length; i++) {
        let preamble = data.slice(i - preambleSz, i);
        if (
            !preamble.some(
                x => data[i] !== 2 * x && preamble.includes(data[i] - x)
            )
        )
            return data[i];
    }
}

function gold() {
    let data = parseInput(Number),
        target = silver();
    for (let i = 0; i < data.length; i++) {
        let sum = data[i] + data[i + 1];
        for (let j = 2; j < data.length && sum < target; j++) {
            sum += data[i + j];
            if (sum === target) {
                let temp = data.slice(i, i + j + 1).sort((a, b) => a - b);
                return temp[0] + temp[temp.length - 1];
            }
        }
    }
}

/* --- Day 17: Trick Shot --- */

function silver(t) {
    let data = parseInput()[0].match(/-?\d+/g).map(Number),
        target = t || {
            x0: data[0],
            x1: data[1],
            y0: data[2],
            y1: data[3]
        },
        minVelX = Math.ceil(invertSumN(target.x0)),
        maxStepsX =
            sumN(minVelX) <= target.x1
                ? Infinity
                : Math.floor(invertSumN(target.x1));
    // if there exists an initial x velocity that goes to 0 inside the target area
    // then return height of max possible velocity
    if (maxStepsX == Infinity) {
        return sumN(target.y0);
    }
    // minimum steps to reach trench is 2 * velocity + 1 for positive velocities
    for (let velY = Math.floor((maxStepsX - 1) / 2); velY > 0; velY--) {
        let steps = stepsToTargetY(target, velY);
        for (let i = 0; i < steps.length; i++) {
            if (steps[i] <= maxStepsX) {
                let posX = sumN(steps[i]);
                // check for an initial x velocity that reaches target in given # of steps
                if (
                    Math.ceil((target.x0 - posX) / steps[i]) <=
                    Math.floor((target.x1 - posX) / steps[i])
                ) {
                    return sumN(velY);
                }
            }
        }
    }
    // if max initial y velocity is negative return inital position 0
    return 0;
}

function gold(t) {
    let data = parseInput()[0].match(/-?\d+/g).map(Number),
        target = t || {
            x0: data[0],
            x1: data[1],
            y0: data[2],
            y1: data[3]
        },
        minVelX = Math.ceil(invertSumN(target.x0)),
        stepsX = [];
    numInitVel = 0;
    // precompute steps to target for all possible initial x velocities
    for (let velX = minVelX; velX <= target.x1; velX++) {
        stepsX[velX - minVelX] = stepsToTargetX(target, velX);
    }
    // for all possible initial y velocities, find initialx velocites
    // that reach the target area in the same # of steps
    for (let velY = target.y0; velY < -target.y0; velY++) {
        let stepsY = stepsToTargetY(target, velY);
        if (stepsY.length) {
            stepsX.forEach(sX => {
                if (
                    stepsY.some(
                        sY =>
                            sX.includes(sY) || (sX[1] == Infinity && sX[0] < sY)
                    )
                ) {
                    numInitVel++;
                }
            });
        }
    }
    return numInitVel;
}

// a faster version of gold(), at the expense of readability
function gold2(t) {
    let data = parseInput()[0].match(/-?\d+/g).map(Number),
        target = t || {
            x0: data[0],
            x1: data[1],
            y0: data[2],
            y1: data[3]
        },
        minVelX = Math.ceil(invertSumN(target.x0)),
        stepsX = [];
    numInitVel = 0;
    for (let velX = minVelX; velX <= target.x1; velX++) {
        stepsX[velX - minVelX] = stepsToTargetX(target, velX);
    }
    for (let velY = target.y0; velY < -target.y0; velY++) {
        let stepsY = stepsToTargetY(target, velY);
        if (stepsY.length) {
            for (let i = 0; i < stepsX.length; i++) {
                for (let j = 0; j < stepsX[i].length; j++) {
                    if (stepsX[i][j] == Infinity) {
                        for (let k = 0; k < stepsY.length; k++) {
                            if (stepsX[i][0] < stepsY[k]) {
                                numInitVel++;
                                j = k = Infinity;
                            }
                        }
                    } else {
                        for (let k = 0; k < stepsY.length; k++) {
                            if (stepsX[i][j] == stepsY[k]) {
                                numInitVel++;
                                j = k = Infinity;
                            }
                        }
                    }
                }
            }
        }
    }
    return numInitVel;
}

// brute force
function gold3(t) {
    let data = parseInput()[0].match(/-?\d+/g).map(Number),
        target = t || {
            x0: data[0],
            x1: data[1],
            y0: data[2],
            y1: data[3]
        },
        minVelX = Math.ceil(invertSumN(target.x0)),
        numInitVel = 0;
    for (let y = target.y0; y < -target.y0; y++) {
        for (let x = minVelX; x <= target.x1; x++) {
            let [posX, posY] = [0, 0],
                [velX, velY] = [x, y];
            while (posX <= target.x1 && posY >= target.y0) {
                posX += velX;
                posY += velY;
                if (
                    target.x0 <= posX &&
                    posX <= target.x1 &&
                    target.y0 <= posY &&
                    posY <= target.y1
                ) {
                    numInitVel++;
                    break;
                }
                if (velX > 0) velX--;
                velY--;
            }
        }
    }
    return numInitVel;
}

const sumN = n => (n * (n + 1)) / 2;
const invertSumN = sum => Math.sqrt(2 * sum + 0.25) - 0.5;

function stepsToTargetX(target, v) {
    let maxPosX = sumN(v);
    if (maxPosX < target.x0) return [];
    if (maxPosX < target.x1)
        return [v - Math.floor(invertSumN(maxPosX - target.x0)), Infinity];
    let minSteps = Math.ceil(invertSumN(maxPosX - target.x1)),
        maxSteps = Math.floor(invertSumN(maxPosX - target.x0)),
        steps = [];
    while (minSteps <= maxSteps) {
        steps[steps.length] = v - minSteps++;
    }
    return steps;
}

function stepsToTargetY(target, v) {
    let maxSteps = Math.floor(invertSumN(sumN(v) - target.y0)) + v + 1,
        minSteps = Math.ceil(invertSumN(sumN(v) - target.y1)) + v + 1,
        steps = [];
    while (minSteps <= maxSteps) {
        steps[steps.length] = minSteps++;
    }
    return steps;
}

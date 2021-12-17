/* --- Day 17: Trick Shot --- */

function silver(){
    let data = parseInput()[0].match(/-?\d+/g).map(Number),
        target = { x0: data[0], x1: data[1], y0: data[2], y1: data[3] };
    return target.y0 * (target.y0 + 1) / 2;
}

function gold(){
    let data = parseInput()[0].match(/-?\d+/g).map(Number),
        target = { x0: data[0], x1: data[1], y0: data[2], y1: data[3] },
        stepsVelY = Array.from( new Array(-2 * target.y0), x => []),
        validVelXY = [];

    // find all valid initial y-velocities ordered to steps to reach the target area
    for( let velY = target.y0; velY < -target.y0; velY++ ){
        let posY = 0,
            vY = velY;
        for( let step = 0; posY >= target.y0; step++ ){
            posY += vY--;
            if( target.y0 <= posY && posY <= target.y1 ){
                stepsVelY[step].push(velY);
            }
        }
    }

    // find all valid initial x-velocites
    for( let velX = Math.ceil(invertSumN(target.x0)); velX <= target.x1; velX++ ){
        let maxPosX = velX * (velX + 1) / 2,
            validVelY = [];
        if( target.x0 <= maxPosX && maxPosX <= target.x1 ){
            let minSteps = velX;
            for( step = 1; target.x0 <= maxPosX; step++ ){
                maxPosX -= step;
                minSteps--;
            }
            console.log( velX, minSteps, velX - Math.ceil(invertSumN(velX * (velX + 1) / 2 - target.x0)));
            validVelY = [].concat(...stepsVelY.slice(minSteps));
        }
        else{
            let posX = 0,
                vX = velX;
            for( let step = 0; posX < target.x1; step++ ){
                posX += vX--;
                if( target.x0 <= posX && posX <= target.x1 ){
                    validVelY.push(...stepsVelY[step]);
                }
            }
        }
        validVelY = [...new Set(validVelY)];
        validVelXY.push(...validVelY.map( velY => [ velX, velY]));
    }
    return validVelXY.length;
}

function invertSumN(sum){
    return Math.sqrt(2 * sum + .25) - .5;
}

function brutalForce(target){
    let validVelXY = [];
    for( y = target.y0; y < -target.y0; y++ ){
        for( x = Math.ceil(invertSumN(target.x0)); x <= target.x1; x++ ){
            let [ posX, posY] = [ 0, 0],
                [ velX, velY] = [ x, y];
            while( posX <= target.x1 && posY >= target.y0 ){
                posX += velX;
                posY += velY;
                if( target.x0 <= posX && posX <= target.x1 && target.y0 <= posY && posY <= target.y1 ){
                    validVelXY.push([ x, y]);
                    break;
                }
                if( velX > 0 ) velX--;
                velY--;
            }
        }
    }
    return validVelXY;
}
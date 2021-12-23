/* --- Day 22: Reactor Reboot --- */

function silver(){
    let data = parseInput( x => [ x.slice( 0, 2), ...x.match(/-?\d+/g).map(Number)]),
        on = {};
    data.forEach( ([ cmd, x0, x1, y0, y1, z0, z1]) => {
        for( let x = Math.max( -50, x0); x <= Math.min( 50, x1); x++ ){
            for( let y = Math.max( -50, y0); y <= Math.min( 50, y1); y++ ){
                for( let z = Math.max( -50, z0); z <= Math.min( 50, z1); z++ ){
                    let cube = `${x}:${y}:${z}`;
                    if( cmd == "on" ){
                        on[cube] = true;
                    }
                    else{
                        delete on[cube];
                    }    
                }
            }
        }
    });
    return Object.keys(on).length;
}

function gold(){
    let data = parseInput( x => [ x.slice( 0, 2), ...x.match(/-?\d+/g).map(Number)]),
        numOn = 0;
    data.forEach( ([ cmd, x0, x1, y0, y1, z0, z1], i) => {
        let totalCubes = (x1 - x0 + 1) * (y1 - y0 + 1) * (z1 - z0 + 1),
            on = {};
        data.slice( 0, 1)
        if( cmd == "on" ){
            numOn +=  totalCubes - overlap;
        }
        else{
            numOn -= overlap;
        }
    });
    return numOn;
}

overlapOn = sum(
    data
    .filter( ([cmd]) => cmd == "on")
    .slice( 0, i)
    .map( ([ cmd, _x0, _x1, _y0, _y1, _z0, _z1]) => {
        return
            Math.max( 0, Math.min( x1, _x1) - Math.max( x0, _x0) + 1) *
            Math.max( 0, Math.min( y1, _y1) - Math.max( y0, _y0) + 1) *
            Math.max( 0, Math.min( z1, _z1) - Math.max( z0, _z0) + 1)
    })
),
overlapOff = sum(
    data
    .filter( ([cmd]) => cmd != "on")
    .slice( 0, i)
    .map( ([ cmd, _x0, _x1, _y0, _y1, _z0, _z1]) => {
        return
            Math.max( 0, Math.min( x1, _x1) - Math.max( x0, _x0) + 1) *
            Math.max( 0, Math.min( y1, _y1) - Math.max( y0, _y0) + 1) *
            Math.max( 0, Math.min( z1, _z1) - Math.max( z0, _z0) + 1)
    })
);

/* --- Day 22: Reactor Reboot --- */

function gold(){

}

let totalCubes = 0;
for( let i = 0; i < steps.length; i++ ){
    let stepCubes = 
            Math.max( 0, Math.min( steps[i].x1, boundary.x1) - Math.max( steps[i].x0, boundary.x0) + 1) *
            Math.max( 0, Math.min( steps[i].y1, boundary.y1) - Math.max( steps[i].y0, boundary.y0) + 1) *
            Math.max( 0, Math.min( steps[i].z1, boundary.z1) - Math.max( steps[i].z0, boundary.z0) + 1),
        commonCubes = 0;
    for( let j = 0; j < i; j++ ){
            }
}

let data = document.getElementsByTagName("code")[74].innerText.trim().split(/\n/).map( x => [ x.slice( 0, 2), ...x.match(/-?\d+/g).map(Number)]),
    steps = data.map( ([ cmd, x0, x1, y0, y1, z0, z1]) => ({ cmd, x0, x1, y0, y1, z0, z1})),
    cache = {};

function countOn( steps, boundary, depth = 1){
    let key = [ steps.length, boundary.x0, boundary.x1, boundary.y0, boundary.y1, boundary.z0, boundary.z1].join(":");
    if( key in cache ) return cache[key];
    if( steps.length == 0 ) return cache[key] = 0;
    let s = steps[steps.length-1],
        sCubes =
            Math.max( 0, Math.min( s.x1, boundary.x1) - Math.max( s.x0, boundary.x0) + 1) *
            Math.max( 0, Math.min( s.y1, boundary.y1) - Math.max( s.y0, boundary.y0) + 1) *
            Math.max( 0, Math.min( s.z1, boundary.z1) - Math.max( s.z0, boundary.z0) + 1),
        b = {
            x0: Math.max( s.x0, boundary.x0),
            x1: Math.min( s.x1, boundary.x1),
            y0: Math.max( s.y0, boundary.y0),
            y1: Math.min( s.y1, boundary.y1),
            z0: Math.max( s.z0, boundary.z0),
            z1: Math.min( s.z1, boundary.z1)
        },
        allCubes = countOn( steps.slice( 0, -1), boundary, depth + 1),
        commonCubes = countOn( steps.slice( 0, -1), s, depth + 1);
    console.log( depth, boundary, s, sCubes, allCubes, commonCubes);
    if( s.cmd == "on" ){
        return cache[key] = allCubes + sCubes - commonCubes;
    }
    else{
        return cache[key] = allCubes - commonCubes;
    }
}
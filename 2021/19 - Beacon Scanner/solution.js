/* --- Day 19: Beacon Scanner --- */

function silver(){
    let data = parseInput( x => x.split(/\n/).slice(1).map( xx => xx.split(",").map(Number)), /\n\n/);
    for
}

let offset = Array.from( new Array(6), () => ({}));
for( let i = 1, diff; i < data.length; i++ ){
    let j = 0;
    diff = data[0][j] - data[i][j >>> 1];
    console.log(diff)
}

getScannerOffset( scanners[0], scanner[1]);

function getScannerOffset( s1, s2){
    let axis = [ 0, 1, 2],
        offset = [],
        a;
    // match x-axis
    a = s1.map( ([ x, y, z]) => x);
    for( let i = 0, off; i < axis.length; i++){
        off = hasCommonAxis( a, s2.map( (xyz) => xyz[axis[i]]));
        if( off != undefined ){
            console.log("x");
            offset.push(off);
            axis.splice( i, 1);
        }
        off = hasCommonAxis( a, s2.map( (xyz) => -xyz[axis[i]]));
        if( off != undefined ){
            console.log("-x");
            offset.push(off);
            axis.splice( i, 1);
        }
    }
    if( offset.length != 1 ) return undefined;
    // match y-axis
    a = s1.map( ([ x, y, z]) => y);
    for( let i = 0, off; i < axis.length; i++){
        off = hasCommonAxis( a, s2.map( (xyz) => xyz[axis[i]]));
        if( off != undefined ){
            console.log("y");
            offset.push(off);
            axis.splice( i, 1);
        }
        off = hasCommonAxis( a, s2.map( (xyz) => -xyz[axis[i]]));
        if( off != undefined ){
            console.log("-y");
            offset.push(off);
            axis.splice( i, 1);
        }
    }
    if( offset.length != 2 ) return undefined;
    // match z-axis
    a = s1.map( ([ x, y, z]) => z);
    for( let i = 0, off; i < axis.length; i++){
        off = hasCommonAxis( a, s2.map( (xyz) => xyz[axis[i]]));
        if( off != undefined ){
            console.log("z");
            offset.push(off);
            axis.splice( i, 1);
        }
        off = hasCommonAxis( a, s2.map( (xyz) => -xyz[axis[i]]));
        if( off != undefined ){
            console.log("-z");
            offset.push(off);
            axis.splice( i, 1);
        }
    }
    if( offset.length != 3 ) return undefined;
    return offset;
}

function hasCommonAxis( s1, s2){
    let diff = {};
    for( let i = 0; i < s1.length; i++ ){
        for( let j = 0; j < s2.length; j++ ){
            let d = s1[i] - s2[j];
            if( !(d in diff) ) diff[d] = new Set();
            diff[d].add(j);
            if( diff[d].size >= 12 ) return d;
        }
    }
    return undefined;
}

/* --- Day 9: Disk Fragmenter --- */

function silver(){
    let data = parseInput(Number, ""),
        csum = 0;

    for(let i = 0, pos = 0; i < data.length; i++){
        let size = data[i];
        csum += (i >>> 1) * size * (pos + (size - 1)/2);
        pos += data[i++];

        while(data[i]){
            let j = data.length - 1,
                size = Math.min(data[i], data[j]);
            csum += (j >>> 1) * size * (pos + (size - 1)/2);
            pos += size;
            data[i] -= size;
            data[j] -= size;
            if( !data[j] ) data.length -= 2;
        }
    }

    return csum;
}

function gold(){
    let data = parseInput(Number, ""),
        pos = new Array(data.length).fill(0),
        csum = 0;
    for(let i = 1; i < data.length; i++){
        pos[i] = pos[i-1] + data[i-1];
    }
    for(let i = data.length - 1; i > 0; i -= 2){
        let size = data[i],
            mapIdx = findEmptySpace(data, size, i);
        csum += (i >>> 1) * size * (pos[mapIdx] + (size - 1)/2);
        pos[mapIdx] += size;
        data[mapIdx] -= size;
    }
    return csum;
}

function findEmptySpace(data, size, endPos){
    for(let j = 1; j < endPos; j += 2){
        if(data[j] >= size) return j;
    }
    return endPos;
}

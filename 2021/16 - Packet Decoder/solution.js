/* --- Day 16: Packet Decoder --- */

function silver(){
    let data = parseInput()[0].replace( /./g, x => parseInt( "1" + x, 16).toString(2).slice(1)),
        packets = [readPacket(data)];
    for( let i = 0; i < packets.length; i++ ){
        if( packets[i].subpackets.length ){
            packets.push(...packets[i].subpackets);
        }
    }
    return sum(packets.map( p => p.version));
}

function gold(){
    let data = parseInput()[0].replace( /./g, x => parseInt( "1" + x, 16).toString(2).slice(1));
    return readPacket(data).value;
}

function readPacket(data){
    let version = parseInt( data.slice( 0, 3), 2),
        type = parseInt( data.slice( 3, 6), 2),
        value = "",
        subpackets = [],
        length = 6;
    if( type != 4 ){
        subpackets = readSubpackets(data.slice(6));
        length += data[6] == "0" ? 16 : 12;
        length += sum(subpackets.map(p => p.length));
    }
    switch( type ){
        case 4:
            let lastValReached = false
            while( !lastValReached ){
                let val = data.slice( length, length += 5);
                value += val.slice(1);
                lastValReached = val[0] == "0";
            }
            value = parseInt( value, 2);
            break;
        case 0: value = sum(subpackets.map( p => p.value)); break;
        case 1: value = prod(subpackets.map( p => p.value)); break;
        case 2: value = Math.min(...subpackets.map( p => p.value)); break;
        case 3: value = Math.max(...subpackets.map( p => p.value)); break;
        case 5: value = +(cmp(...subpackets.map( p => p.value))  > 0); break;
        case 6: value = +(cmp(...subpackets.map( p => p.value))  < 0); break;
        case 7: value = +(cmp(...subpackets.map( p => p.value)) == 0); break;
    }
    return { version, type, value, subpackets, length }
}

function readSubpackets(data){
    let subpackets = [];
    if( data[0] == "0" ){
        let subLength = parseInt( data.slice( 1, 16), 2);
        data = data.slice( 16, 16 + subLength);
        while( data.length ){
            let sp = readPacket(data);
            subpackets.push(sp);
            data = data.slice(sp.length);
        }
    }
    else{
        subpackets.length = parseInt( data.slice( 1, 12), 2);
        data = data.slice(12);
        for( let i = 0; i < subpackets.length; i++ ){
            let sp = readPacket(data);
            subpackets[i] = sp;
            data = data.slice(sp.length);
        }
    }
    return subpackets;
}
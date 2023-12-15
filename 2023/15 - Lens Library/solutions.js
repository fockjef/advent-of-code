/* --- Day 15: Lens Library --- */

function silver(){
    return parseInput(x => x.replace(/\n/g, "").split(",")).map(hash).sum();
}

function hash(str){
    let h = 0;
    for(let i = 0; i < str.length; i++){
        h = (h + str.charCodeAt(i)) % 256;
    }
    return h;
}
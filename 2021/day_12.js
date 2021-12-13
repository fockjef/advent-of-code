function isValidPath1(path){
    return isUpperCase(path[0]) || !path.includes( path[0], 1);
}

function isValidPath2(path){
    let smallCaves = path.slice(1).filter(isLowerCase);
    return isValidPath1(path) || smallCaves.length == new Set(smallCaves).size;
}

function findPaths( path, nodes, isValidPath){
    if( path[0] == "end" ){
        return [path.reverse()];
    }
    return [].concat(
        ...nodes[path[0]]
        .map( node => [ node, ...path])
        .filter(isValidPath)
        .map( path => findPaths( path, nodes, isValidPath))
    );
}

function day_12a( isValidPath = isValidPath1){
    let data = parseInput( x => x.split("-")),
        nodes = {};
    // intialize nodes
    data.forEach( ([n1,n2]) => {
        if( !(n1 in nodes) ) nodes[n1] = [];
        if( !(n2 in nodes) ) nodes[n2] = [];
        if( n2 !== "start" ) nodes[n1].push(n2);
        if( n1 !== "start" ) nodes[n2].push(n1);
    });
    nodes.end = [];
    return findPaths( ["start"], nodes, isValidPath).length;
}

function day_12b(){
    return day_12a(isValidPath2);
}
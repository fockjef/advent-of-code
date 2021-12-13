const isUpper = /^[A-Z]+$/g;

function findPaths_broken( path, nodes){
    if( path[0] == "end" ){
        return [path.reverse];
    }
    return [].concat(
        ...nodes[path[0]]
        .filter( node => isUpper.test(node) || !path.includes(node))
        .map( node => findPaths( [node, ...path], nodes))
    );
}

function findPaths( nodes){
    let numPaths = 0,
        paths = [["start"]],
        nextPaths = [];
    while( paths.length ){
        for( let i = 0; i < paths.length; i++ ){
            p = paths[i];
            if( p[0] == "end" ){
                numPaths++;
            }
            else{
                nodes[p[0]]
                .filter( node => isUpper.test(node) || !p.includes(node))
                .forEach( node => {
                    nextPaths.push([ node, ...p]);
                })
            }
        }
        paths = nextPaths;
        nextPaths = [];
    }
    return numPaths;
}

function day_12a(){
    let data = parseInput( x => x.split("-")),
        nodes = {};
    // intialize nodes
    data.forEach( ([n1,n2]) => {
        if( !(n1 in nodes) ) nodes[n1] = [];
        if( !(n2 in nodes) ) nodes[n2] = [];
        nodes[n1].push(n2);
        nodes[n2].push(n1);
    });
    return findPaths( [["start"]], nodes);
}
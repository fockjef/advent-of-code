/* --- Day 6: No Space Left On Device --- */

// build file system
let fileSystem = {},
    cwd = [];
parseInput(/\n/).forEach( line => {
    switch( line.slice(0,3) ){
        case "$ l":
        case "dir":
            // ignore
            break;
        case "$ c":
            let dir = line.slice(5);
            if     ( dir    == ".." ){ cwd.pop(); }
            else if( dir[0] == "/"  ){ cwd = dir.split("/"); }
            else                     { cwd.push(dir); }
            break;
        default:
            let size = parseInt(line, 10);
            for( let i = 2; i <= cwd.length; i++ ){
                let path = cwd.slice(0,i).join("/");
                fileSystem[path] = (fileSystem[path] || 0) + size;
            }
            break;
    }
});

var silver = () => Object.values(fileSystem).filter(size => size < 100_000).sum();
var gold = () => Object.values(fileSystem).filter(size => size >= fileSystem["/"] - 40_000_000).min();

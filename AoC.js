/* Helper functions */
const sum = x => x.reduce((sum, n) => sum + Number(n), 0);
const prod = x => x.reduce((prod, n) => prod * n);
const mean = x => sum(x) / x.length;
const median = x => mean(x.slice().sort(numericSortAsc).slice(x.length - 1 >>> 1, (x.length >>> 1) + 1));
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b );
const lcm = (a, b) => a * b / gcd(a, b);
const cmp = (a, b) => a < b ? -1 : a == b ? 0 : 1;
const numericSortAsc = (a, b) => cmp(+a, +b);
const numericSortDesc = (a, b) => cmp(+b, +a);
const reUpperCase = /^[A-Z]+$/;
const reLowerCase = /^[a-z]+$/;
const isUpperCase = s => reUpperCase.test(s);
const isLowerCase = s => reLowerCase.test(s);
Array.prototype.sum = function(){return sum(this)};
Array.prototype.prod = function(){return prod(this)};
Array.prototype.mean = function(){return mean(this)};
Array.prototype.median = function(){return median(this)};
Array.prototype.numericSortAsc = function(){return this.sort(numericSortAsc)};
Array.prototype.numericSortDesc = function(){return this.sort(numericSortDesc)};
Array.prototype.max = function(){try{return Math.max(...this)}catch(e){return this.numericSortDesc()[0]}};
Array.prototype.min = function(){try{return Math.min(...this)}catch(e){return this.numericSortAsc ()[0]}};
function* permute(a){
    yield a;
    let i = 1,
        c = new Array(a.length).fill(0);
    while( i < a.length ){
        if( c[i] < i ){
            let swapIdx = i % 2 ? c[i] : 0,
                temp = a[swapIdx];
            a[swapIdx] = a[i];
            a[i] = temp;
            yield a;
            c[i]++;
            i = 1;
        }
        else{
            c[i] = 0;
            i++;
        }
    }
}

const env = typeof window == "undefined" ? "node" : "browser";
let [ year, day] = env == "browser"
    ? (location.href.match(/^https:\/\/(?:www\.)?adventofcode\.com\/(\d{4})\/day\/(\d+)\/input$/) || []).slice(1)
    : process.argv.slice(2).map(Number),
    dayDir;
if( +day < 10 ) day = "0" + (+day);

function parseInput(mapFunc, delim = /\n/ ){
    if( mapFunc !== undefined && typeof mapFunc !== "function" ){
        delim = mapFunc;
        mapFunc = undefined;
    }
    let data = env == "browser" ? document.body.innerText : readFile(`${year}/${dayDir}/input.txt`);
    data = data.trimRight().split(delim);
    return mapFunc ? data.map(mapFunc) : data;
}

function readFile(file){
    return fs.readFileSync(file).toString();
}

function green(s){
    return env == "node" ? `\x1b[38;5;2m${s}\x1b[0m` : `%c${s}%c`;
}

function red(s){
    return env == "node" ? `\x1b[38;5;1m${s}\x1b[0m` : `%c${s}%c`;
}

function runSolutions(expected = ""){
    expected = expected.split(/\n/).map(x => x.trim());
    console.log(`AoC ${year} day ${day}`);
    [ "silver", "gold"].forEach((s, i) => {
        if( s in globalThis ){
            let answer = globalThis[s]().toString().trim(),
                status = !expected[i]
                    ? " "
                    : `${answer == expected[i] ? green("✓") : red("✗")}`,
                color = env == "node" || expected[i] == undefined
                    ? ""
                    : `color:${answer == expected[i]? "green" : "red"}`;
            console.log(`${(s+"  ").slice(0,6)}: ${status} ${answer}`, color, "");
        }
    });
}

/*
    Run solution in dev console:
    document.head.appendChild( document.createElement( "script" ) ).src = "https://fockjef.net/advent-of-code/AoC.js"

    Run solution on command line:
    node AoC.js {year} {day}
*/
(async function loader(){
    if( year && day ){
        if( env == "browser" ){
            let title = (await fetch(location.href.slice(0, -6)).then(res => res.text())).match(/--- Day \d+: (.*?) ---/)[1];
            dayDir = `${day} - ${title}`;
            let script = document.head.appendChild( document.createElement( "script" ) );
            script.onload = () => {
                let script = document.head.appendChild( document.createElement( "script" ) );
                script.onerror = () => runSolutions();
                script.src = `https://fockjef.net/softcors/?ctype=jsonp&callback=runSolutions&url=https%3A%2F%2Ffockjef.net%2Fadvent-of-code%2F${year}%2F${dayDir}%2Fexpected.txt`;
            };
            script.src = `https://fockjef.net/advent-of-code/${year}/${dayDir}/solution.js`;
        }
        else{
            if( typeof globalThis == "undefined" ) global.globalThis = global;
            globalThis.fs = require("fs");
            dayDir = fs.readdirSync(year.toString()).find(x => x.startsWith(day))
            if( fs.existsSync(`${year}/${dayDir}/solution.js`) ){
                eval(readFile(`${year}/${dayDir}/solution.js`) );
                try{ globalThis.silver = eval("silver") }catch(e){}
                try{ globalThis.gold   = eval("gold")   }catch(e){}
                let expected = fs.existsSync(`${year}/${dayDir}/expected.txt`)
                    ? readFile(`${year}/${dayDir}/expected.txt`)
                    : "";
                runSolutions(expected);
            }
            else{
                console.log("No solution found.");
            }
        }
    }
})();

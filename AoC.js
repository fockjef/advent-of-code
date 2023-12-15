/*
    Run solution in dev console:
    document.head.appendChild( document.createElement( "script" ) ).src = "https://fockjef.net/advent-of-code/AoC.js"

    Run solution on command line:
    node AoC.js {year} {day}
*/

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
const clone = x => JSON.parse(JSON.stringify(x));
Array.prototype.sum = function(){return sum(this)};
Array.prototype.prod = function(){return prod(this)};
Array.prototype.mean = function(){return mean(this)};
Array.prototype.median = function(){return median(this)};
Array.prototype.numericSortAsc = function(){return this.sort(numericSortAsc)};
Array.prototype.numericSortDesc = function(){return this.sort(numericSortDesc)};
Array.prototype.max = function(){try{return Math.max(...this)}catch(e){return this.numericSortDesc()[0]}};
Array.prototype.min = function(){try{return Math.min(...this)}catch(e){return this.numericSortAsc ()[0]}};
Array.prototype.transpose = function(){
    let T = Array.from(new Array(this[0].length), () => new Array(this.length));
    for(let r = 0; r < this.length; r++){
        for(let c = 0; c < T.length; c++){
            T[c][r] = this[r][c];
        }
    }
    return T;
};
RegExp.prototype.findAll = function(str) {
    let self = new RegExp(this, 'g'),
        matches = [];
    while (1) {
        let m = self.exec(str);
        if (m == null) return matches;
        matches.push(m);
    }
};
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
let [ year, day, showTimes] = env == "browser"
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
            let t0 = performance.now(),
                answer = globalThis[s]().toString().trim(),
                status = !expected[i]
                    ? " "
                    : `${answer == expected[i] ? green("✓") : red("✗")}`,
                color = env == "node" || expected[i] == undefined
                    ? ""
                    : `color:${answer == expected[i]? "green" : "red"}`;
            t0 = showTimes ? `(${((performance.now() - t0) / 1000).toFixed(3)}s)` : "";
            console.log(`${(s+"  ").slice(0,6)}: ${status} ${answer} ${t0}`, color, "");
        }
    });
}

// prettier-ignore
if( env == "node" && 0 /*builtin md5 is slower!*/ ){
    const crypto = require("crypto");
    globalThis.md5 = s => crypto.createHash("md5").update(s).digest("hex");
}
else{
    // project home: https://github.com/gorhill/yamd5.js
    !function(_){"use strict";function b(l,n){let m=l[0],j=l[1],p=l[2],o=l[3];m+=(j&
    p|~j&o)+n[0]-680876936,m=(m<<7|m>>>25)+j,o+=(m&j|~m&p)+n[1]-389564586,o=(o<<12|o
    >>>20)+m,p+=(o&m|~o&j)+n[2]+606105819,p=(p<<17|p>>>15)+o,j-=1044525330-(p&o|~p&m
    )-n[3],j=(j<<22|j>>>10)+p,m+=(j&p|~j&o)+n[4]-176418897,m=(m<<7|m>>>25)+j,o+=(m&j
    |~m&p)+n[5]+1200080426,o=(o<<12|o>>>20)+m,p+=(o&m|~o&j)+n[6]-1473231341,p=(p<<17
    |p>>>15)+o,j+=(p&o|~p&m)+n[7]-45705983,j=(j<<22|j>>>10)+p,m+=1770035416+(j&p|~j&
    o)+n[8],m=(m<<7|m>>>25)+j,o+=(m&j|~m&p)+n[9]-1958414417,o=(o<<12|o>>>20)+m,p+=(o
    &m|~o&j)+n[10]-42063,p=(p<<17|p>>>15)+o,j+=(p&o|~p&m)+n[11]-1990404162,j=(j<<22|
    j>>>10)+p,m+=(j&p|~j&o)+n[12]+1804603682,m=(m<<7|m>>>25)+j,o-=40341101-(m&j|~m&p
    )-n[13],o=(o<<12|o>>>20)+m,p+=(o&m|~o&j)+n[14]-1502002290,p=(p<<17|p>>>15)+o,j+=
    (p&o|~p&m)+n[15]+1236535329,j=(j<<22|j>>>10)+p,m+=(j&o|p&~o)+n[1]-165796510,m=(m
    <<5|m>>>27)+j,o+=(m&p|j&~p)+n[6]-1069501632,o=(o<<9|o>>>23)+m,p+=(o&j|m&~j)+n[11
    ]+643717713,p=(p<<14|p>>>18)+o,j+=(p&m|o&~m)+n[0]-373897302,j=(j<<20|j>>>12)+p,m
    +=(j&o|p&~o)+n[5]-701558691,m=(m<<5|m>>>27)+j,o+=(m&p|j&~p)+n[10]+38016083,o=m+(
    o<<9|o>>>23),p+=(o&j|m&~j)+n[15]-660478335,p=(p<<14|p>>>18)+o,j+=(p&m|o&~m)+n[4]
    -405537848,j=(j<<20|j>>>12)+p,m+=(j&o|p&~o)+n[9]+568446438,m=(m<<5|m>>>27)+j,o+=
    (m&p|j&~p)+n[14]-1019803690,o=(o<<9|o>>>23)+m,p+=(o&j|m&~j)+n[3]-187363961,p=o+(
    p<<14|p>>>18),j+=(p&m|o&~m)+n[8]+1163531501,j=(j<<20|j>>>12)+p,m-=1444681467-(j&
    o|p&~o)-n[13],m=(m<<5|m>>>27)+j,o+=(m&p|j&~p)+n[2]-51403784,o=(o<<9|o>>>23)+m,p
    +=(o&j|m&~j)+n[7]+1735328473,p=(p<<14|p>>>18)+o,j+=(p&m|o&~m)+n[12]-1926607734,j
    =(j<<20|j>>>12)+p,m+=(j^p^o)+n[5]-378558,m=(m<<4|m>>>28)+j,o-=2022574463-(m^j^p)
    -n[8],o=(o<<11|o>>>21)+m,p+=(o^m^j)+n[11]+1839030562,p=(p<<16|p>>>16)+o,j+=(p^o^
    m)+n[14]-35309556,j=(j<<23|j>>>9)+p,m+=(j^p^o)+n[1]-1530992060,m=(m<<4|m>>>28)+j
    ,o+=(m^j^p)+n[4]+1272893353,o=(o<<11|o>>>21)+m,p+=(o^m^j)+n[7]-155497632,p=(p<<
    16|p>>>16)+o,j+=(p^o^m)+n[10]-1094730640,j=(j<<23|j>>>9)+p,m+=681279174+(j^p^o)+
    n[13],m=(m<<4|m>>>28)+j,o+=(m^j^p)+n[0]-358537222,o=(o<<11|o>>>21)+m,p+=(o^m^j)+
    n[3]-722521979,p=(p<<16|p>>>16)+o,j+=(p^o^m)+n[6]+76029189,j=(j<<23|j>>>9)+p,m+=
    (j^p^o)+n[9]-640364487,m=(m<<4|m>>>28)+j,o+=(m^j^p)+n[12]-421815835,o=m+(o<<11|o
    >>>21),p+=(o^m^j)+n[15]+530742520,p=(p<<16|p>>>16)+o,j+=(p^o^m)+n[2]-995338651,j
    =(j<<23|j>>>9)+p,m+=(p^(j|~o))+n[0]-198630844,m=(m<<6|m>>>26)+j,o+=(j^(m|~p))+n[
    7]+1126891415,o=(o<<10|o>>>22)+m,p+=(m^(o|~j))+n[14]-1416354905,p=(p<<15|p>>>17)
    +o,j+=(o^(p|~m))+n[5]-57434055,j=(j<<21|j>>>11)+p,m+=(p^(j|~o))+n[12]+1700485571
    ,m=(m<<6|m>>>26)+j,o+=(j^(m|~p))+n[3]-1894986606,o=(o<<10|o>>>22)+m,p+=(m^(o|~j)
    )+n[10]-1051523,p=(p<<15|p>>>17)+o,j+=(o^(p|~m))+n[1]-2054922799,j=(j<<21|j>>>11
    )+p,m+=(p^(j|~o))+n[8]+1873313359,m=(m<<6|m>>>26)+j,o+=(j^(m|~p))+n[15]-30611744
    ,o=(o<<10|o>>>22)+m,p+=(m^(o|~j))+n[6]-1560198380,p=(p<<15|p>>>17)+o,j+=(o^(p|~m
    ))+n[13]+1309151649,j=(j<<21|j>>>11)+p,m+=(p^(j|~o))+n[4]-145523070,m=(m<<6|m>>>
    26)+j,o+=(j^(m|~p))+n[11]-1120210379,o=(o<<10|o>>>22)+m,p+=718787259+(m^(o|~j))+
    n[2],p=(p<<15|p>>>17)+o,j+=(o^(p|~m))+n[9]-343485551,j=(j<<21|j>>>11)+p,l[0]+=m,
    l[1]+=j,l[2]+=p,l[3]+=o}function i(){this.b=new ArrayBuffer(68),this.l=0,this.s=
    new I(4),this.m=0,this.c=new Uint8Array(this.b,0,68),this.d=new Uint32Array(this
    .b,0,17),this.t()}i.prototype.a=function(o){let n,l=this.c,k=this.d,p=this.m,m=0
    ;for(;;){for(n=Math.min(o.length-m,64-p);n--;)l[p++]=o.charCodeAt(m++);if(p<64)
    break;this.l+=64,b(this.s,k),p=0}return this.m=p,this},i.prototype.t=function(){
    return this.l=0,this.m=0,this.s.set(a),this},i.prototype.e=function(){let q=this
    .m,r=this.c,k=this.d,m=1+(q>>2);return this.l+=q,r[q]=128,r[q+1]=r[q+2]=r[q+3]=0
    ,k.set(h.subarray(m),m),q>55&&(b(this.s,k),k.set(h)),k[14]=8*this.l,b(this.s,k),
    function(k){let r,p,l,m,q=e,o=d;for(m=0;m<4;m++)for(p=8*m,r=k[m],l=0;l<8;l+=2)o[
    p+1+l]=q.charAt(15&r),r>>>=4,o[p+0+l]=q.charAt(15&r),r>>>=4;return o.join("")}(
    this.s)};let I=Int32Array,e="0123456789abcdef",d=[],x=1732584193,y=-271733879,a=
    new I([x,y,~x,~y]),h=new I(16),f=new i;_.md5=function(k){return f.t().a(k).e()}}
    (globalThis);
}

(async function loader(){
    if( year && day ){
        if( env == "browser" ){
            let title = (await fetch(location.href.slice(0, -6)).then(res => res.text())).match(/--- Day \d+: (.*?) ---/)[1];
            title = title.replace(/[\\\/:*?"<>|]/g, "");
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
            globalThis.performance = require("perf_hooks").performance;
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
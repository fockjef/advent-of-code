/* --- Day 4: The Ideal Stocking Stuffer --- */

function silver(prefix = '00000', secret = 'ckczppom') {
    for (let i = 1; true; i++) {
        if (md5(secret + i).slice(0, prefix.length) === prefix) return i;
    }
}

function gold() {
    return silver('000000');
}

// prettier-ignore
const md5=m=>{m=new TextEncoder().encode(m);let U=Uint32Array,z=16,A,B,C,D,g=new
U(64).map((_,i)=>(i<z?i:i<32?5*i+1:i<48?3*i+5:7*i)%z),s=[3,8,13,18,1,5,10,z,0,7,
12,19,2,6,11,17],K=g.map((_,i)=>4**z*Math.abs(Math.sin(i+1))),r=(x,n)=>x<<n|x>>>
(32-n),l=m.length,b=new Uint8Array(l+65-(l+1)%64),x=1732584193,y=4023233417,i,H=
new U([x,y,~x,~y]),M,n,c=b.buffer;b.set(m);b[l]=128;new U(c).subarray(-2)[0]=l*8
;for(n=0;n<b.length;n+=64){M=new U(c,n,z);[A,B,C,D]=H;for(i=0;i<64;i++)[A,B,C,D]
=[D,B+r((i<z?D^(B&(C^D)):i<32?C^(D&(B^C)):i<48?B^C^D:C^(B|~D))+A+K[i]+M[g[i]],s[
(i&3)+4*(i>>4)]+4),B,C];[A,B,C,D].map((x,i)=>H[i]+=x)}return[0,4,8,12].map(i=>(4
**z+new DataView(H.buffer).getUint32(i)).toString(z).slice(1)).join("")};

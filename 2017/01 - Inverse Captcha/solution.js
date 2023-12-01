/* --- Day 1: Inverse Captcha --- */

function silver(){
    return parseInput()[0].split("").filter((d, i, D) => d == D[(i + 1) % D.length]).sum();
}

function gold(){
    return parseInput()[0].split("").filter((d, i, D) => d == D[(i + D.length / 2) % D.length]).sum();
}

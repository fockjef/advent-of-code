/* --- Day 9: Explosives in Cyberspace --- */

function silver() {
    return decompLength(parseInput()[0]);
}

function gold() {
    return decompLength(parseInput()[0], 2);
}

function decompLength(data, version = 1) {
    let len = 0,
        pos = 0;
    while (pos < data.length) {
        let markerStart = data.indexOf('(', pos);
        if (markerStart == -1) return len + data.length - pos;
        let markerEnd = data.indexOf(')', markerStart + 1);
        if (markerEnd == -1) return len + data.length - pos;
        let marker = data.slice(markerStart + 1, markerEnd),
            [l, r] = marker.split('x').map(Number),
            ll =
                version == 2
                    ? decompLength(
                          data.slice(markerEnd + 1, markerEnd + 1 + l),
                          version
                      )
                    : l;
        len += markerStart - pos + ll * r;
        pos = markerEnd + 1 + l;
    }
    return len;
}

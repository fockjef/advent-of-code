/* --- Day 6: Custom Customs --- */

function silver() {
    let data = parseInput(/\n\n/);
    return sum(data.map(responses => new Set(responses.match(/[a-z]/g)).size));
}

function gold() {
    let data = parseInput(/\n\n/);
    return sum(
        data.map(responses => {
            responses = responses
                .trim()
                .split(/\n/)
                .map(r => new Set(r.match(/[a-z]/g)));
            let allY = [...responses[0]];
            for (let i = 1; i < responses.length && allY.length; i++) {
                allY = allY.filter(yes => responses[i].has(yes));
            }
            return allY.length;
        })
    );
}

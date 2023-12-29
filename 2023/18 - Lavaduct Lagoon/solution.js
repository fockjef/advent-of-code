/* --- Day 18: Lavaduct Lagoon --- */

function silver() {
    let segments = parseInput(x => x.split(' ').slice(0, 2));
    return calculateArea(segments);
}

function gold() {
    let segments = parseInput(x =>
        x
            .match(/(?<=#)(.{5})(.)/)
            .slice(1, 3)
            .reverse()
    );
    return calculateArea(segments, 16);
}

function calculateArea(segments, radix = 10) {
    let profile = new Profile(),
        xPos = 0,
        yPos = 0;
    segments.forEach(([dir, dist]) => {
        dist = parseInt(dist, radix);
        switch (dir) {
            case 'U':
            case '3':
                segments.push({x0: xPos, y0: yPos, x1: xPos, y1: yPos + dist});
                yPos += dist;
                break;
            case 'D':
            case '1':
                segments.push({x0: xPos, y0: yPos - dist, x1: xPos, y1: yPos});
                yPos -= dist;
                break;
            case 'L':
            case '2':
                segments.push({x0: xPos - dist, y0: yPos, x1: xPos, y1: yPos});
                xPos -= dist;
                break;
            case 'R':
            case '0':
                segments.push({x0: xPos, y0: yPos, x1: xPos + dist, y1: yPos});
                xPos += dist;
                break;
        }
    });
    return segments
        .sort((a, b) => b.y1 - a.y1 || a.x0 - b.x0)
        .filter(s => s.x0 != s.x1)
        .map(profile.add_segment.bind(profile))
        .sum();
}

function Profile() {
    let segments = (this.segments = []);
    this.width = 0;
    this.yPos = undefined;
    this.add_segment = function ({x0, y0, x1, y1}) {
        let area = this.yPos == undefined ? 0 : this.width * (this.yPos - y0);
        if (segments.length == 0 || x0 > segments[segments.length - 1].x1) {
            segments.push({x0, x1});
            area += x1 - x0 + 1;
        } else {
            for (let i = 0; i < segments.length; i++) {
                let s = segments[i];
                foo = true;
                if (x1 < s.x0) {
                    segments.splice(i, 0, {x0, x1});
                    area += x1 - x0 + 1;
                    break;
                } else if (x1 == s.x0) {
                    if (i > 0 && x0 == segments[i - 1].x1) {
                        segments[i - 1].x1 = s.x1;
                        segments.splice(i, 1);
                        area += x1 - x0 - 1;
                    } else {
                        s.x0 = x0;
                        area += x1 - x0;
                    }
                    break;
                } else if (x0 == s.x0) {
                    if (x1 == s.x1) {
                        segments.splice(i, 1);
                    } else {
                        s.x0 = x1;
                    }
                    break;
                } else if (x1 == s.x1) {
                    s.x1 = x0;
                    break;
                } else if (x0 > s.x0 && x1 < s.x1) {
                    segments.splice(i, 0, {x0: s.x0, x1: x0});
                    s.x0 = x1;
                    break;
                } else if (x0 == s.x1) {
                    if (i < segments.length - 1 && x1 == segments[i + 1].x0) {
                        s.x1 = segments[i + 1].x1;
                        segments.splice(i + 1, 1);
                        area += x1 - x0 - 1;
                    } else {
                        s.x1 = x1;
                        area += x1 - x0;
                    }
                    break;
                }
            }
        }
        this.width = segments.map(s => s.x1 - s.x0 + 1).sum();
        this.yPos = y0;
        return area;
    };
}

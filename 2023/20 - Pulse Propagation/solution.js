/* --- Day 20: Pulse Propagation --- */

const LOW = 0;
const HIGH = 1;

function silver() {
    let modules = parseInput(x => x.match(/[&%]?\w+/g)).reduce(
            (modules, [name, ...dests]) => {
                switch (name[0]) {
                    case '%':
                        name = name.slice(1);
                        modules[name] = new FlipFlop(name, dests);
                        break;
                    case '&':
                        name = name.slice(1);
                        modules[name] = new Conjunction(name, dests);
                        break;
                    default:
                        modules[name] = new Broadcaster(name, dests);
                }
                return modules;
            },
            {}
        ),
        numPulses = [0, 0];

    // initialize Conjunction modules
    Object.keys(modules).forEach(name => {
        modules[name].dests.forEach(dest => {
            if (dest in modules && 'initSource' in modules[dest]) {
                modules[dest].initSource(name);
            }
        });
    });

    for (let i = 0; i < 1000; i++) {
        pressButton(modules).forEach(
            (cnt, LOWHIGH) => (numPulses[LOWHIGH] += cnt)
        );
    }
    return numPulses.prod();
}

function gold() {
    let modules = parseInput(x => x.match(/[&%]?\w+/g)).reduce(
            (modules, [name, ...dests]) => {
                switch (name[0]) {
                    case '%':
                        name = name.slice(1);
                        modules[name] = new FlipFlop(name, dests);
                        break;
                    case '&':
                        name = name.slice(1);
                        modules[name] = new Conjunction(name, dests);
                        break;
                    default:
                        modules[name] = new Broadcaster(name, dests);
                }
                return modules;
            },
            {}
        ),
        numPulses = [0, 0];

    modules['rx'] = new Reciever('rx', []);

    // initialize Conjunction modules
    Object.keys(modules).forEach(name => {
        modules[name].dests.forEach(dest => {
            if (dest in modules && 'initSource' in modules[dest]) {
                modules[dest].initSource(name);
            }
        });
    });

    let conMod = Object.values(modules).filter(m => m.type == 'Conjunction');
    for (let i = 1; true; i++) {
        pressButton(modules, i);
        if (conMod.every(m => m.highPulse)) {
            return conMod.map(m => m.highPulse).reduce(lcm);
        }
    }
}

function pressButton(modules, i) {
    let numPulses = [0, 0],
        pulses = [['button', 'broadcaster', LOW]];
    while (pulses.length) {
        let [src, dest, pulse] = pulses.shift();
        numPulses[pulse]++;
        if (
            pulse == HIGH &&
            modules[src].type == 'Conjunction' &&
            modules[src].highPulse == undefined
        ) {
            modules[src].highPulse = i;
        }
        if (dest in modules) {
            pulses.push(...modules[dest].processPulse(src, pulse));
        }
    }
    return numPulses;
}

function FlipFlop(name, dests) {
    this.name = name;
    this.dests = dests;
    this.state = 0;
    this.type = this.constructor.name;
    this.processPulse = function (src, pulse) {
        if (pulse == LOW) {
            this.state ^= 1;
            return dests.map(dest => [this.name, dest, this.state]);
        } else {
            return [];
        }
    };
}

function Conjunction(name, dests) {
    this.name = name;
    this.dests = dests;
    this.state = {};
    this.type = this.constructor.name;
    this.initSource = function (src) {
        this.state[src] = LOW;
    };
    this.processPulse = (src, pulse) => {
        this.state[src] = pulse;
        let out = Object.values(this.state).every(s => s == HIGH) ? 0 : 1;
        return dests.map(dest => [this.name, dest, out]);
    };
}

function Broadcaster(name, dests) {
    this.name = name;
    this.dests = dests;
    this.state = null;
    this.type = this.constructor.name;
    this.processPulse = (src, pulse) =>
        dests.map(dest => [this.name, dest, pulse]);
}

function Reciever(name, dests) {
    this.name = name;
    this.dests = dests;
    this.state = null;
    this.type = this.constructor.name;
    this.processPulse = function (src, pulse) {
        if (pulse == LOW) {
            console.log(this.name, src, pulse);
            this.state = LOW;
        }
        return [];
    };
}

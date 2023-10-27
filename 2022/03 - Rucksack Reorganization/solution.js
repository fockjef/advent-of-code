/* --- Day 3: Rucksack Reorganization --- */

var silver = () =>
    parseInput(sack =>
        priority(
            sack
                .slice(0, sack.length >> 1)
                .replace(
                    new RegExp(`[^${sack.slice(sack.length >> 1)}]`, 'g'),
                    ''
                )
        )
    ).sum();
var gold = () =>
    parseInput((sack, i, data) =>
        i % 3
            ? 0
            : priority(
                  [...sack].find(
                      item =>
                          data[i + 1].includes(item) &&
                          data[i + 2].includes(item)
                  )
              )
    ).sum();

const priority = item => (item.charCodeAt() - 38) % 58;

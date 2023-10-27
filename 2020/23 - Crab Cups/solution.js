/* --- Day 23: Crab Cups --- */

function silver(init = '562893147') {
    let cup1 = shuffle(init, 100),
        curr = cup1.next,
        result = '';
    while (curr.val !== 1) {
        result += curr.val;
        curr = curr.next;
    }
    return result;
}

function gold(init = '562893147') {
    let cup1 = shuffle(init, 10_000_000, 1_000_000);
    return cup1.next.val * cup1.next.next.val;
}

function shuffle(init, numRounds, numCups) {
    let cups = new Array(numCups || init.length),
        head = {},
        tail = head;
    for (let i = 0; i < cups.length; i++) {
        tail.val = i < init.length ? +init[i] : i + 1;
        cups[tail.val - 1] = tail;
        tail = tail.next = {prev: tail};
    }
    head.prev = tail.prev;
    head.prev.next = head;
    for (let i = 0, curr = cups[init[0] - 1]; i < numRounds; i++) {
        let pickup = curr.next,
            dest = curr.val - 1 || cups.length;
        curr = curr.next = pickup.next.next.next;
        while (
            pickup.val === dest ||
            pickup.next.val === dest ||
            pickup.next.next.val === dest
        ) {
            dest = dest - 1 || cups.length;
        }
        dest = cups[dest - 1];
        pickup.prev = dest;
        pickup.next.next.next = dest.next;
        dest.next = pickup;
    }
    return cups[0];
}

/* --- Day 6: Guard Gallivant --- */

class Guard{
    static PATROLLING = 0;
    static OFF_GRID = 1;
    static IN_LOOP = 2;

    static #MOVES = [
        [-1,  0], // ^ - up
        [ 0,  1], // > - right
        [ 1,  0], // v - down
        [ 0, -1]  // < - left
    ];

    #visited = new Set();

    constructor(grid){
        this.grid = grid;
        this.row = grid.findIndex(r => r.some(c => /[^.#]/.test(c)));
        this.col = grid[this.row].findIndex(c => /[^.#]/.test(c));
        this.dir = "^>v<".indexOf(grid[this.row][this.col]);
        this.state = Guard.PATROLLING;
        this.#visited.add(`${this.row},${this.col},${this.dir}`);
    }

    get visited(){
        return [...new Set([...this.#visited].map(x => x.split(",").slice(0, 2).join(",")))].map(pos => pos.split(","));
    }

    #move(){
        let r = this.row + Guard.#MOVES[this.dir][0],
            c = this.col + Guard.#MOVES[this.dir][1];

        // Guard has left the grid
        if(r < 0 || this.grid.length <= r || c < 0 || this.grid[0].length <= c){
            this.state = Guard.OFF_GRID;
        }
        // Guard has run into an obstacle
        else if(this.grid[r][c] == "#"){
            this.dir = (this.dir + 1) % Guard.#MOVES.length;
            this.#move();
        }
        // Guard can move to next position
        else{
            let state = `${r},${c},${this.dir}`;
            if(this.#visited.has(state)){
                this.state = Guard.IN_LOOP;
            }
            else{
                this.#visited.add(state);
                [this.row, this.col] = [r, c];
            }
        }
    }

    patrol(){
        while(this.state == Guard.PATROLLING){
            this.#move();
        }
        return this;
    }
}

function silver(){
    let data = parseInput(x => x.split(""));
    return new Guard(data).patrol().visited.length;
}

function gold(){
    let data = parseInput(x => x.split(""));
    return new Guard(data).patrol().visited.filter(([r, c]) => {
        if(data[r][c] != ".") return false;
        data[r][c] = "#";
        let guard = new Guard(data);
        guard.patrol();
        data[r][c] = ".";
        return guard.state == Guard.IN_LOOP;
    }).length;
}
